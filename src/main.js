import anime from 'animejs';
import { Sharia3DScene } from './three-scene.js';
import { AKAD_DATA } from './data/akad-data.js';
import { hitungKMKMusyarakah, formatRupiah } from './calculators/kmk-calculator.js';
import { hitungKI_MMQ } from './calculators/mmq-calculator.js';
import './style.css';

class AkadApp {
  constructor() {
    this.currentMode = 'kmk'; // 'kmk' or 'ki'
    this.scene = null;
    this.currentStep = 1;
    this.autoPlayTimer = null;
    this.init();
  }

  init() {
    this.scene = new Sharia3DScene('canvas3d');
    this.bindTabEvents();
    this.initStepPlayer();
    this.renderCurrentMode();
    this.renderComparisonMatrix();
    this.bindCalculatorEvents();
  }

  bindTabEvents() {
    const tabKMK = document.getElementById('tabKMK');
    const tabMMQ = document.getElementById('tabMMQ');

    tabKMK.addEventListener('click', () => {
      if (this.currentMode === 'kmk') return;
      this.switchMode('kmk');
      tabKMK.classList.add('active');
      tabMMQ.classList.remove('active');
    });

    tabMMQ.addEventListener('click', () => {
      if (this.currentMode === 'ki') return;
      this.switchMode('ki');
      tabMMQ.classList.add('active');
      tabKMK.classList.remove('active');
    });
  }

  switchMode(mode) {
    this.currentMode = mode;
    this.stopAutoPlay();
    this.scene.setMode(mode === 'kmk' ? 'kmk' : 'mmq');

    anime({
      targets: '#modeContentWrapper',
      opacity: [1, 0],
      translateY: [0, -10],
      duration: 200,
      easing: 'easeInOutQuad',
      complete: () => {
        this.renderCurrentMode();
        anime({
          targets: '#modeContentWrapper',
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 350,
          easing: 'easeOutQuad'
        });
      }
    });
  }

  initStepPlayer() {
    const buttons = document.querySelectorAll('.step-pill-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = parseInt(btn.getAttribute('data-step'), 10);
        this.setStep(step);
        this.stopAutoPlay();
      });
    });

    const btnAutoPlay = document.getElementById('btnAutoPlay');
    if (btnAutoPlay) {
      btnAutoPlay.addEventListener('click', () => {
        if (this.autoPlayTimer) {
          this.stopAutoPlay();
        } else {
          this.startAutoPlay();
        }
      });
    }
  }

  setStep(step) {
    this.currentStep = step;
    if (this.scene) {
      this.scene.highlightStep(step);
    }

    const buttons = document.querySelectorAll('.step-pill-btn');
    buttons.forEach(btn => {
      const s = parseInt(btn.getAttribute('data-step'), 10);
      btn.classList.toggle('active', s === step);
    });

    const data = this.currentMode === 'kmk' ? AKAD_DATA.kmk : AKAD_DATA.ki;
    const stepData = data.lifecycleSteps[step - 1];

    if (stepData) {
      const indicator = document.getElementById('stepActiveIndicator');
      if (indicator) indicator.textContent = `Tahap ${step}: ${stepData.title}`;

      const callout = document.getElementById('stepCalloutText');
      if (callout) {
        callout.innerHTML = `<strong>${stepData.actor}:</strong> ${stepData.desc}`;
      }
    }
  }

  startAutoPlay() {
    const btn = document.getElementById('btnAutoPlay');
    const label = document.getElementById('autoPlayLabel');
    if (btn) btn.classList.add('playing');
    if (label) label.textContent = 'Jeda Auto-Play';

    this.autoPlayTimer = setInterval(() => {
      let next = this.currentStep + 1;
      if (next > 6) next = 1;
      this.setStep(next);
    }, 3200);
  }

  stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    const btn = document.getElementById('btnAutoPlay');
    const label = document.getElementById('autoPlayLabel');
    if (btn) btn.classList.remove('playing');
    if (label) label.textContent = 'Auto-Play Alur';
  }

  renderCurrentMode() {
    const data = this.currentMode === 'kmk' ? AKAD_DATA.kmk : AKAD_DATA.ki;

    // Update Header Pill & Tagline
    document.getElementById('akadHeroBadge').textContent = data.heroBadge;
    document.getElementById('akadNameDisplay').textContent = data.akadName;
    document.getElementById('akadSubDisplay').textContent = data.subAkad;
    document.getElementById('akadTaglineDisplay').textContent = data.tagline;

    // Update 3D Legend labels
    if (this.currentMode === 'kmk') {
      document.getElementById('legendItem1').textContent = 'Porsi Modal Bank (70-80%)';
      document.getElementById('legendItem2').textContent = 'Self-Financing Nasabah (20-30%)';
      document.getElementById('legendItem3').textContent = 'Escrow & SPK Project Hub';
      document.getElementById('legendItem3Box').style.display = 'flex';
      document.getElementById('mmqSliderContainer').style.display = 'none';
    } else {
      document.getElementById('legendItem1').textContent = 'Hishshah Bank (Sewa Ijarah)';
      document.getElementById('legendItem2').textContent = 'Porsi Modal Nasabah (Equity)';
      document.getElementById('legendItem3Box').style.display = 'none';
      document.getElementById('mmqSliderContainer').style.display = 'block';
    }

    // Render Overview Text
    document.getElementById('overviewSummary').textContent = data.overview.summary;

    const whyList = document.getElementById('whyBankList');
    whyList.innerHTML = '';
    data.overview.whyBankChooses.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      whyList.appendChild(li);
    });

    const fatwaBox = document.getElementById('fatwaBox');
    fatwaBox.innerHTML = '';
    data.overview.fatwa.forEach(f => {
      const span = document.createElement('span');
      span.className = 'fatwa-pill';
      span.textContent = `${f.no} (${f.title})`;
      fatwaBox.appendChild(span);
    });

    // Render 6 Lifecycle Steps
    const stepsGrid = document.getElementById('stepsGrid');
    stepsGrid.innerHTML = '';
    data.lifecycleSteps.forEach((step, idx) => {
      const card = document.createElement('div');
      card.className = 'step-card';
      card.innerHTML = `
        <span class="step-number">0${step.step}</span>
        <span class="step-actor">${step.actor}</span>
        <h4 class="step-title">${step.title}</h4>
        <p class="step-desc">${step.desc}</p>
      `;
      stepsGrid.appendChild(card);
    });

    // Animate Step Cards Entrance
    anime({
      targets: '.step-card',
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(60),
      duration: 400,
      easing: 'easeOutQuad'
    });

    // Render Risk Mitigation
    const riskBox = document.getElementById('riskMitigationList');
    riskBox.innerHTML = '';
    data.riskMitigations.forEach(r => {
      const div = document.createElement('div');
      div.className = 'metric-item';
      div.style.marginBottom = '10px';
      div.innerHTML = `
        <div style="font-weight: 700; color: #dc2626; font-size: 0.85rem; margin-bottom: 4px;">⚠️ ${r.risk}</div>
        <div style="font-size: 0.82rem; color: #334155; line-height: 1.5;"><strong>Mitigasi Bank:</strong> ${r.mitigation}</div>
      `;
      riskBox.appendChild(div);
    });

    // Update Step Pill Buttons Text
    const kmkStepLabels = ['1. SPK Kontrak', '2. Akad Line', '3. Cair Promes', '4. Proyek Fisik', '5. Termin Escrow', '6. Auto-Debet'];
    const mmqStepLabels = ['1. Appraisal Aset', '2. Akad MMQ', '3. Beli ke Vendor', '4. Operasi Aset', '5. Angsuran Ujrah', '6. Tamlik 100%'];
    const activeLabels = this.currentMode === 'kmk' ? kmkStepLabels : mmqStepLabels;
    const stepBtns = document.querySelectorAll('.step-pill-btn');
    stepBtns.forEach((btn, idx) => {
      if (activeLabels[idx]) btn.textContent = activeLabels[idx];
    });

    this.setStep(1);
    this.renderSchematic();

    // Switch Calculator View
    if (this.currentMode === 'kmk') {
      document.getElementById('calcKMKWrapper').style.display = 'block';
      document.getElementById('calcMMQWrapper').style.display = 'none';
      this.updateKMKCalc();
    } else {
      document.getElementById('calcKMKWrapper').style.display = 'none';
      document.getElementById('calcMMQWrapper').style.display = 'block';
      this.updateMMQCalc();
    }
  }

  bindCalculatorEvents() {
    // KMK Inputs
    ['kmkSpkInput', 'kmkBankPctRange', 'kmkTenorRange', 'kmkRateRange', 'kmkTerminSelect'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateKMKCalc());
    });

    // MMQ Inputs
    ['mmqAsetSelect', 'mmqDpRange', 'mmqTenorRange', 'mmqUjrahRange'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', () => this.updateMMQCalc());
    });

    // 3D MMQ Slider
    const mmq3dSlider = document.getElementById('mmq3dProgress');
    if (mmq3dSlider) {
      mmq3dSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        document.getElementById('mmq3dMonthLabel').textContent = `Bulan ke-${val}`;
        const maxVal = parseFloat(mmq3dSlider.max) || 60;
        const initialEquity = 0.20; // 20%
        const ratio = initialEquity + (1 - initialEquity) * (val / maxVal);
        this.scene.updateMMQOwnership(ratio);
        const nasabahPct = Math.round(ratio * 100);
        document.getElementById('mmq3dRatioLabel').textContent = `Nasabah: ${nasabahPct}% | Bank: ${100 - nasabahPct}%`;
      });
    }
  }

  updateKMKCalc() {
    const nilaiSpk = parseFloat(document.getElementById('kmkSpkInput').value) || 1000000000;
    const porsiBankPct = parseFloat(document.getElementById('kmkBankPctRange').value) || 80;
    const tenorBulan = parseInt(document.getElementById('kmkTenorRange').value) || 4;
    const eqRatePct = parseFloat(document.getElementById('kmkRateRange').value) || 12.0;
    const jumlahTermin = parseInt(document.getElementById('kmkTerminSelect').value) || 3;

    // Update labels
    document.getElementById('kmkBankPctLabel').textContent = `${porsiBankPct}%`;
    document.getElementById('kmkTenorLabel').textContent = `${tenorBulan} Bulan`;
    document.getElementById('kmkRateLabel').textContent = `${eqRatePct.toFixed(1)}% p.a.`;

    const res = hitungKMKMusyarakah({ nilaiSpk, porsiBankPct, tenorBulan, eqRatePct, jumlahTermin });

    document.getElementById('kmkPlafonDisplay').textContent = formatRupiah(res.porsiBank);
    document.getElementById('kmkSelfFinancingDisplay').textContent = formatRupiah(res.selfFinancingNasabah);
    document.getElementById('kmkBagiHasilDisplay').textContent = formatRupiah(res.totalBagiHasilBank);
    document.getElementById('kmkTotalKembaliDisplay').textContent = formatRupiah(res.totalKewajibanBank);

    // Render Table Termin Escrow
    const tbody = document.getElementById('kmkTerminTableBody');
    tbody.innerHTML = '';
    res.terminList.forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>Termin ${t.terminKe}</strong></td>
        <td>${formatRupiah(t.nilaiTermin)}</td>
        <td style="color: #085f3b; font-weight: 600;">${formatRupiah(t.potongPokok)}</td>
        <td style="color: #c59b27; font-weight: 600;">${formatRupiah(t.potongBagiHasil)}</td>
        <td style="font-weight: 700; color: #0284c7;">${formatRupiah(t.sisaRilisNasabah)}</td>
        <td>${formatRupiah(t.sisaBakiDebet)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  updateMMQCalc() {
    const nilaiAset = parseFloat(document.getElementById('mmqAsetSelect').value) || 2500000000;
    const uangMukaPct = parseFloat(document.getElementById('mmqDpRange').value) || 20;
    const tenorTahun = parseInt(document.getElementById('mmqTenorRange').value) || 5;
    const ujrahRatePct = parseFloat(document.getElementById('mmqUjrahRange').value) || 10.5;

    // Update labels
    document.getElementById('mmqDpLabel').textContent = `${uangMukaPct}%`;
    document.getElementById('mmqTenorLabel').textContent = `${tenorTahun} Tahun (${tenorTahun * 12} Bln)`;
    document.getElementById('mmqUjrahLabel').textContent = `${ujrahRatePct.toFixed(1)}% p.a.`;

    const res = hitungKI_MMQ({ nilaiAset, uangMukaPct, tenorTahun, ujrahRatePct });

    document.getElementById('mmqPorsiBankDisplay').textContent = formatRupiah(res.hishshahBankAwal);
    document.getElementById('mmqAngsuranPertamaDisplay').textContent = formatRupiah(res.angsuranBulanPertama);
    document.getElementById('mmqAngsuranTerakhirDisplay').textContent = formatRupiah(res.angsuranBulanTerakhir);
    document.getElementById('mmqTotalUjrahDisplay').textContent = formatRupiah(res.totalUjrahDibayar);
    document.getElementById('mmqTotalBayarDisplay').textContent = formatRupiah(res.totalPengembalian);

    // Sync 3D slider max
    const mmq3dSlider = document.getElementById('mmq3dProgress');
    if (mmq3dSlider) {
      mmq3dSlider.max = res.totalBulan;
      mmq3dSlider.value = 1;
      document.getElementById('mmq3dMonthLabel').textContent = 'Bulan ke-1';
      this.scene.updateMMQOwnership(uangMukaPct / 100);
      document.getElementById('mmq3dRatioLabel').textContent = `Nasabah: ${uangMukaPct}% | Bank: ${100 - uangMukaPct}%`;
    }

    // Render Sample Table Schedule (Bulan 1, 12, 24, 36, dst + Akhir)
    const tbody = document.getElementById('mmqScheduleTableBody');
    tbody.innerHTML = '';

    const selectedMonths = [1, 6, 12, 24, 36, 48, 60, res.totalBulan].filter((m, idx, arr) => m <= res.totalBulan && arr.indexOf(m) === idx);

    selectedMonths.forEach(mIdx => {
      const row = res.amortisasiSchedule[mIdx - 1];
      if (!row) return;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>Bln ${row.bulan}</strong></td>
        <td>${formatRupiah(row.sisaHishshahAwal)}</td>
        <td style="color: #085f3b; font-weight: 600;">${formatRupiah(row.pokokBeli)}</td>
        <td style="color: #c59b27; font-weight: 600;">${formatRupiah(row.ujrahSewa)}</td>
        <td style="font-weight: 700;">${formatRupiah(row.totalAngsuran)}</td>
        <td><span class="badge-sharia">${row.porsiNasabahPct.toFixed(1)}% : ${row.porsiBankPct.toFixed(1)}%</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  renderSchematic() {
    const grid = document.getElementById('schematicGrid');
    const flowRow = document.getElementById('schematicFlowRow');
    const subtitle = document.getElementById('schematicSubtitle');
    if (!grid || !flowRow) return;

    if (this.currentMode === 'kmk') {
      if (subtitle) subtitle.textContent = 'Pemetaan 4 Pihak & Arus Kas Rekening Escrow Ring-Fencing';

      grid.innerHTML = `
        <div class="schematic-node node-bouwheer">
          <div class="schematic-node-icon" style="background: #e0f2fe; color: #0284c7;">🏢</div>
          <div class="schematic-node-title">Bouwheer</div>
          <div class="schematic-node-role">Pemberi Kerja / Pemilik Proyek (Penerbit SPK & Pembayar Termin Resmi)</div>
        </div>
        <div class="schematic-node node-nasabah">
          <div class="schematic-node-icon" style="background: #fef9c3; color: #b45309;">👷‍♂️</div>
          <div class="schematic-node-title">Nasabah (Kontraktor)</div>
          <div class="schematic-node-role">Mitra Pelaksana Kerja (Penyedia Self-Financing Modal Sendiri 20-30%)</div>
        </div>
        <div class="schematic-node node-bank">
          <div class="schematic-node-icon" style="background: #dcfce7; color: #085f3b;">🏛️</div>
          <div class="schematic-node-title">Bank Syariah</div>
          <div class="schematic-node-role">Shohibul Maal / Penyedia Plafon Line Facility Musyarakah (70-80%)</div>
        </div>
        <div class="schematic-node node-escrow">
          <div class="schematic-node-icon" style="background: #e0e7ff; color: #4338ca;">🔒</div>
          <div class="schematic-node-title">Rekening Escrow</div>
          <div class="schematic-node-role">Penampung Khusus Berdaya Blokir: Split Pokok, Nisbah Bagi Hasil, & Laba</div>
        </div>
      `;

      flowRow.innerHTML = `
        <div class="flow-connector-card">
          <strong>1. Penarikan Promes ke Escrow</strong>
          Bank mencairkan porsi modal kerja bertahap per Surat Sanggup (Promes) ke Rekening Escrow sesuai kebutuhan riil belanja proyek.
        </div>
        <div class="flow-connector-card">
          <strong>2. Pelaksanaan Proyek Fisik</strong>
          Nasabah mengerjakan fisik proyek sesuai kurva S dan diverifikasi berkala oleh tim monitoring lapangan bank syariah.
        </div>
        <div class="flow-connector-card">
          <strong>3. Auto-Debet Termin Bouwheer</strong>
          Termin Bouwheer wajib masuk ke Escrow. Bank mendebet otomatis pokok promes & bagi hasil, sisa laba proyek cair ke nasabah.
        </div>
      `;
    } else {
      if (subtitle) subtitle.textContent = 'Pemetaan Kepemilikan Bersama (Syirkah Al-Mulk), Sewa (Ijarah), & Pengalihan Hak (Tamlik)';

      grid.innerHTML = `
        <div class="schematic-node node-bank">
          <div class="schematic-node-icon" style="background: #dcfce7; color: #085f3b;">🏛️</div>
          <div class="schematic-node-title">Bank Syariah</div>
          <div class="schematic-node-role">Pemilik Hishshah Awal (80%), Pemberi Sewa (Mu'jir), & Penerima Ujrah</div>
        </div>
        <div class="schematic-node node-nasabah">
          <div class="schematic-node-icon" style="background: #fef9c3; color: #b45309;">🏭</div>
          <div class="schematic-node-title">Nasabah Industri</div>
          <div class="schematic-node-role">Pemodal Awal (DP 20%), Penyewa (Musta'jir), & Pembeli Bertahap</div>
        </div>
        <div class="schematic-node node-bouwheer">
          <div class="schematic-node-icon" style="background: #e0f2fe; color: #0284c7;">⚙️</div>
          <div class="schematic-node-title">Vendor / Supplier</div>
          <div class="schematic-node-role">Penyedia Mesin / Alat Berat / Pabrik (Penerima Transfer Dana Bersama)</div>
        </div>
        <div class="schematic-node node-escrow">
          <div class="schematic-node-icon" style="background: #e0e7ff; color: #4338ca;">🏷️</div>
          <div class="schematic-node-title">Aset Produktif</div>
          <div class="schematic-node-role">Objek MMQ: Dimiliki Bersama, Disewakan, dan Dialihkan 100% saat Lunas</div>
        </div>
      `;

      flowRow.innerHTML = `
        <div class="flow-connector-card">
          <strong>1. Joint Purchase ke Vendor</strong>
          Bank Syariah (80%) dan Nasabah (20%) bersama-sama membayar vendor untuk pengadaan aset fisik produktif.
        </div>
        <div class="flow-connector-card">
          <strong>2. Angsuran Dwi-Fungsi Bulanan</strong>
          Setiap bulan nasabah membayar satu paket angsuran: Ujrah (sewa hishshah bank) + Pembelian porsi modal bank.
        </div>
        <div class="flow-connector-card">
          <strong>3. Tamlik Hak Milik Sempurna</strong>
          Hishshah bank menyusut dari 80% ke 0%. Pada akhir tenor, aset resmi 100% berpindah menjadi milik nasabah.
        </div>
      `;
    }
  }

  renderComparisonMatrix() {
    const tbody = document.getElementById('matrixTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    AKAD_DATA.comparisonMatrix.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="param-title">${item.parameter}</td>
        <td class="kmk-val">${item.kmk}</td>
        <td class="mmq-val">${item.mmq}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AkadApp();
});
