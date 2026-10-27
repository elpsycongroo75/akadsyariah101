/**
 * Database Pengetahuan & Komparasi Akad Perbankan Syariah
 * KMK SPK Musyarakah Line Facility vs KI MMQ (Musyarakah Mutanaqisah)
 * Perspektif Risk Management & Relationship Manager Bank Syariah
 */

export const AKAD_DATA = {
  kmk: {
    id: 'kmk-musyarakah',
    code: 'KMK-SPK / PMK',
    title: 'Kredit Modal Kerja (KMK) SPK Umum / PMK',
    akadName: 'Musyarakah Line Facility',
    subAkad: 'Syirkah Al-\'Inan (Revolving / Non-Revolving)',
    tagline: 'Solusi Permodalan Proyek Berbasis Underlying SPK / Kontrak Kerja dengan Pengendalian Arus Kas via Rekening Escrow',
    heroBadge: 'Modal Kerja Konstruksi & Pengadaan (KMK / PMK)',
    overview: {
      summary: 'Akad Musyarakah Line Facility adalah fasilitas permodalan kerja di mana Bank Syariah dan Nasabah bermitra menyatukan modal (Syirkah) untuk mendanai eksekusi proyek atau kontrak kerja (SPK/PO) dari pemberi kerja (Bouwheer). Keuntungan proyek dibagi hasilkan sesuai nisbah yang disepakati, dan pelunasan pokok ditarik otomatis dari termin pembayaran Bouwheer yang wajib masuk ke Rekening Escrow Bank.',
      whyBankChooses: [
        'Kebutuhan modal kerja proyek bersifat dinamis dan menyeluruh (material, upah tenaga kerja, logistik, sewa alat), sehingga tidak tepat jika dipaksakan menggunakan akad Murabahah yang kaku hanya pada pembelian barang fisik.',
        'Mekanisme Line Facility memberikan fleksibilitas penarikan bertahap (per Promes / Surat Sanggup) sesuai kebutuhan riil kas proyek (cash flow matching), menghindari beban biaya dana berlebih pada nasabah.',
        'Arus kas pembayaran termin Bouwheer dipagari (ring-fenced) secara legal melalui Rekening Escrow dan Standing Instruction / Cessie Piutang Notariil, meminimalisir risiko diversion of funds (penyelewengan dana ke proyek lain).'
      ],
      fatwa: [
        { no: 'Fatwa DSN-MUI No. 08/DSN-MUI/IV/2000', title: 'Pembiayaan Musyarakah' },
        { no: 'Fatwa DSN-MUI No. 115/DSN-MUI/IX/2017', title: 'Akad Pembiayaan Musyarakah' },
        { no: 'Standar Standar AAOIFI FAS 4', title: 'Musharaka Financing' }
      ]
    },
    keyParameters: {
      underlying: 'Surat Perintah Kerja (SPK), Kontrak Konstruksi, Purchase Order (PO), atau Dokumen Pengadaan yang sah dan terverifikasi.',
      porsiModal: 'Bank 70% - 80% dari RAB / Nilai SPK; Nasabah 20% - 30% (Self-Financing / Porsi Ekuitas).',
      tenorFasilitas: 'Plafon Induk 12 bulan (review tahunan); Tenor Promes Penarikan 3 - 6 bulan (disesuaikan durasi proyek).',
      keuntunganBank: 'Nisbah Bagi Hasil atas pendapatan / laba kotor proyek (ditargetkan setara Equivalent Rate 11% - 13% eff. p.a.).',
      sumberPelunasan: 'Termin pembayaran dari Bouwheer yang disalurkan langsung ke Rekening Escrow / Virtual Account di Bank Syariah.',
      revolvingType: 'Tersedia skema Revolving (plafon kembali pulih setelah termin melunasi promes) atau Non-Revolving (sekali pakai per proyek).'
    },
    lifecycleSteps: [
      {
        step: 1,
        title: 'Verifikasi & Due Diligence SPK',
        actor: 'Relationship Manager & Risk Analyst',
        desc: 'Bank melakukan verifikasi keaslian SPK ke kantor Bouwheer, meneliti track record pemberi kerja, kelayakan RAB, riwayat penyelesaian proyek nasabah, dan legalitas kontrak.',
        icon: 'file-check'
      },
      {
        step: 2,
        title: 'Penetapan Plafon & Perikatan Akad',
        actor: 'Komite Pembiayaan & Notaris',
        desc: 'Persetujuan Komite Pembiayaan untuk Plafon Induk Line Facility, penandatanganan Akad Induk Musyarakah, pengikatan agunan fixed asset, serta Cessie Piutang SPK di hadapan Notaris.',
        icon: 'file-signature'
      },
      {
        step: 3,
        title: 'Penarikan Bertahap (Promes Drawdown)',
        actor: 'Bagian Pembiayaan / Loan Operations',
        desc: 'Nasabah mengajukan permohonan penarikan dana per tahapan kerja dengan menandatangani Surat Sanggup (Promes). Porsi modal bank dicairkan ke Rekening Escrow lalu dialirkan ke operasional proyek.',
        icon: 'banknote'
      },
      {
        step: 4,
        title: 'Eksekusi Proyek & Monitoring Lapangan',
        actor: 'Nasabah & Tim Monitoring Bank',
        desc: 'Nasabah melaksanakan pekerjaan fisik. Tim Monitoring Bank melakukan kunjungan lapangan (on-site inspection) dan opname fisik berkala untuk memastikan progres riil sesuai kurva S.',
        icon: 'activity'
      },
      {
        step: 5,
        title: 'Incoming Billing ke Rekening Escrow',
        actor: 'Bouwheer / Pemberi Kerja',
        desc: 'Bouwheer mentransfer pembayaran termin langsung ke Rekening Escrow Bank Jakarta sesuai instruksi pembayaran (standing instruction). Dana tertampung di rekening yang dikunci otorisasi bank.',
        icon: 'shield-check'
      },
      {
        step: 6,
        title: 'Auto-Debet Settlement & Penihilan Baki Debet',
        actor: 'Sistem Core Banking',
        desc: 'Bank memotong otomatis porsi pengembalian pokok promes dan porsi bagi hasil bank sesuai nisbah. Baki debet promes menjadi NIHIL (Rp 0,-), sisa laba bersih ditransfer ke rekening giro nasabah.',
        icon: 'check-circle-2'
      }
    ],
    riskMitigations: [
      {
        risk: 'Keterlambatan Pembayaran Termin Bouwheer',
        mitigation: 'Fasilitas menyediakan klausul perpanjangan jangka waktu Promes dengan addendum bersyarat dan verifikasi penyebab keterlambatan langsung ke Bouwheer. Nasabah wajib menyediakan dana talangan dari sumber pendapatan lain jika jatuh tempo kritis.'
      },
      {
        risk: 'Deviasi Arus Kas / Penyelewengan Dana (Side-Streaming)',
        mitigation: 'Rekening Escrow dengan sistem debet terbatas dan penarikan berbasis prestasi proyek (progress billing), serta standing instruction resmi dari Bouwheer yang tidak dapat dibatalkan sepihak.'
      },
      {
        risk: 'Wanprestasi Pelaksanaan Fisik oleh Nasabah',
        mitigation: 'Penetapan porsi self-financing nasabah minimal 20-30%, pengikatan agunan kebendaan (tanah/bangunan/deposito) dengan coverage minimal 125%, serta garansi bank (Performance Bond).'
      }
    ]
  },

  ki: {
    id: 'ki-mmq',
    code: 'KI / Pembiayaan Investasi',
    title: 'Kredit Investasi (KI) / Pembiayaan Investasi',
    akadName: 'Musyarakah Mutanaqisah (MMQ)',
    subAkad: 'Syirkah Al-Mulk + Ijarah + Ba\'i (Gradual Buyback)',
    tagline: 'Struktur Pembiayaan Aset Produktif Jangka Panjang melalui Kepemilikan Bersama dan Pengalihan Bertahap Secara Berkeadilan',
    heroBadge: 'Investasi Mesin, Pabrik & Properti Komersial (KI)',
    overview: {
      summary: 'Musyarakah Mutanaqisah (MMQ) adalah akad kemitraan kepemilikan aset di mana Bank Syariah dan Nasabah bersama-sama membeli aset modal produktif (tanah, bangunan pabrik, gudang, alat berat, atau mesin industri). Bank kemudian menyewakan porsi kepemilikannya (Hishshah) kepada nasabah untuk mendapatkan Ujrah, sementara nasabah membeli porsi kepemilikan bank secara bertahap hingga aset 100% menjadi milik nasabah.',
      whyBankChooses: [
        'Fleksibel untuk tenor panjang (3 s.d. 15 tahun) dengan mekanisme penetapan Ujrah yang dapat ditinjau berkala (Reviewable Ujrah) sesuai benchmark pasar perbankan tanpa melanggar prinsip syariah.',
        'Berbeda dengan Murabahah yang mengunci harga jual mati sejak awal, MMQ tidak menimbulkan perselisihan porsi keuntungan jika nasabah melakukan pelunasan dipercepat (early settlement), karena nasabah cukup membeli sisa porsi modal (Hishshah) bank yang belum ditebus.',
        'Aset investasi langsung menjadi aset riil yang terikat secara hukum sejak hari pertama pembiayaan, memperkuat kepastian fisik dan mitigasi risiko legal bank syariah.'
      ],
      fatwa: [
        { no: 'Fatwa DSN-MUI No. 73/DSN-MUI/XI/2008', title: 'Akad Musyarakah Mutanaqisah' },
        { no: 'Fatwa DSN-MUI No. 09/DSN-MUI/IV/2000', title: 'Pembiayaan Ijarah' },
        { no: 'Standar AAOIFI Shari\'ah Standard No. 12', title: 'Sharika (Musharaka) and Modern Corporations' }
      ]
    },
    keyParameters: {
      underlying: 'Aset modal produktif riil: Mesin pabrik, unit alat berat, tanah & gedung kantor/gudang, armada kapal, armada transportasi operasional.',
      porsiModal: 'Porsi Awal: Bank 70% - 85% (Hishshah Bank); Nasabah 15% - 30% (Hishshah Nasabah / Uang Muka).',
      tenorFasilitas: 'Jangka menengah hingga panjang (36 bulan s.d. 120+ bulan / 3 - 10 tahun).',
      keuntunganBank: 'Ujrah (pendapatan sewa atas porsi aset milik bank) yang dibayar nasabah setiap bulan.',
      sumberPelunasan: 'Cash flow operasional perusahaan dari hasil utilitas aset produktif yang dibiayai.',
      akhirKepemilikan: 'Aset 100% beralih sempurna menjadi hak milik tunggal nasabah (Tamlik) setelah hishshah bank mencapai 0%.'
    },
    lifecycleSteps: [
      {
        step: 1,
        title: 'Appraisal & Uji Kelayakan Aset Investasi',
        actor: 'Independent Appraiser & Risk Analyst',
        desc: 'Penilaian nilai wajar aset (Fair Market Value & Liquidation Value), pengecekan status hukum (Clean & Clear), serta evaluasi proyeksi peningkatan kapasitas produksi usaha nasabah.',
        icon: 'search-check'
      },
      {
        step: 2,
        title: 'Akad Pengikatan MMQ & Ijarah',
        actor: 'Komite Pembiayaan & Notaris',
        desc: 'Penandatanganan Akad Musyarakah Mutanaqisah (pembelian bersama aset), Perjanjian Sewa (Ijarah porsi bank ke nasabah), dan Janji Beli Porsi Bertahap (Wa\'ad bi al-Ba\'i).',
        icon: 'scroll'
      },
      {
        step: 3,
        title: 'Pencairan Dana Bersama ke Vendor',
        actor: 'Treasury & Loan Operations',
        desc: 'Nasabah menyetorkan porsi modal awal (20%), Bank mencairkan porsi pembiayaan (80%) langsung ke rekening supplier/vendor aset. Aset resmi menjadi kepemilikan bersama (Syirkah Al-Mulk).',
        icon: 'truck'
      },
      {
        step: 4,
        title: 'Pemanfaatan Aset dalam Operasional',
        actor: 'Nasabah / Debitur',
        desc: 'Aset diserahkan dan dioperasikan penuh oleh nasabah untuk menghasilkan omzet dan arus kas produktif. Nasabah menanggung pemeliharaan operasional rutin.',
        icon: 'factory'
      },
      {
        step: 5,
        title: 'Angsuran Bulanan Terpadu (Ujrah + Porsi Beli)',
        actor: 'Nasabah & Sistem Bank',
        desc: 'Setiap bulan nasabah membayar satu paket angsuran yang terbagi dua: 1) Pendapatan Ujrah (sewa untuk bank) dan 2) Pembelian porsi hishshah bank (pokok modal). Porsi bank terus menyusut.',
        icon: 'pie-chart'
      },
      {
        step: 6,
        title: 'Tamlik & Penyerahan Kepemilikan 100%',
        actor: 'Legal Bank & Notaris',
        desc: 'Setelah seluruh porsi bank terbeli (hishshah bank = 0%), hubungan MMQ berakhir. Bank melepaskan seluruh hak kepemilikannya (Tamlik), melakukan roya agunan, dan aset resmi 100% milik nasabah.',
        icon: 'award'
      }
    ],
    riskMitigations: [
      {
        risk: 'Penurunan Nilai Pasar / Kerusakan Aset Fisik',
        mitigation: 'Wajib ditutup asuransi syariah (Takaful) komprehensif (All Risk / Industrial All Risk) dengan klausul Banker\'s Clause atas nama Bank Syariah.'
      },
      {
        risk: 'Penurunan Kemampuan Bayar Sewa (Default)',
        mitigation: 'Hak tanggungan / Fidusia diikat atas aset sejak awal. Jika terjadi wanprestasi, bank berhak menyita dan menjual aset bersama, hasil penjualan dibagi sesuai persentase sisa hishshah masing-masing.'
      },
      {
        risk: 'Kebutuhan Restrukturisasi / Pelunasan Dipercepat',
        mitigation: 'Karena berbasis kepemilikan porsi, pelunasan dini cukup menghitung sisa porsi modal (Hishshah) pokok bank yang belum ditebus tanpa sengketa potongan margin seperti pada Murabahah.'
      }
    ]
  },

  comparisonMatrix: [
    {
      parameter: 'Tujuan Pembiayaan',
      kmk: 'Modal Kerja Operasional Proyek (bahan baku, upah, sewa alat, operasional harian SPK)',
      mmq: 'Investasi Aset Tetap Produktif (mesin pabrik, gudang, alat berat, gedung komersial)'
    },
    {
      parameter: 'Sifat Underlying',
      kmk: 'Surat Perintah Kerja (SPK), PO, Kontrak Proyek Bouwheer',
      mmq: 'Objek Aset Fisik Riil yang berwujud (Tangible Capital Asset)'
    },
    {
      parameter: 'Bentuk Akad Utama',
      kmk: 'Musyarakah (\'Inan) dengan struktur Line Facility bertahap',
      mmq: 'Musyarakah Mutanaqisah (Syirkah Al-Mulk + Ijarah + Wa\'ad Ba\'i)'
    },
    {
      parameter: 'Jangka Waktu (Tenor)',
      kmk: 'Jangka Pendek: Plafon 1 tahun, penarikan promes 3 s.d. 6 bulan',
      mmq: 'Jangka Menengah - Panjang: 3 tahun s.d. 10+ tahun'
    },
    {
      parameter: 'Struktur Penarikan Dana',
      kmk: 'Bertahap sesuai Promes per proyek yang disetujui (Revolving / Non-Revolving)',
      mmq: 'Sekaligus di awal untuk pelunasan pembelian aset kepada vendor'
    },
    {
      parameter: 'Sumber Pengembalian (Source of Repayment)',
      kmk: 'Pembayaran termin dari Bouwheer via Rekening Escrow',
      mmq: 'Arus kas operasional (EBITDA / Net Cash Flow) umum perusahaan'
    },
    {
      parameter: 'Mekanisme Keuntungan Bank',
      kmk: 'Nisbah Bagi Hasil atas realisasi pendapatan / laba proyek SPK',
      mmq: 'Ujrah (Sewa) atas porsi aset bank yang disewakan ke nasabah'
    },
    {
      parameter: 'Status Aset di Akhir Akad',
      kmk: 'Proyek selesai diserahterimakan ke Bouwheer, baki debet promes nihil',
      mmq: 'Aset 100% beralih sempurna menjadi milik nasabah (Tamlik)'
    },
    {
      parameter: 'Penanganan Pelunasan Dipercepat',
      kmk: 'Baki debet promes ditutup begitu termin Bouwheer masuk',
      mmq: 'Nasabah cukup menebus sisa porsi modal (Hishshah) bank saat itu'
    },
    {
      parameter: 'Agunan Tambahan Utama',
      kmk: 'Cessie Piutang SPK Notariil + Standing Instruction Escrow + Fixed Asset',
      mmq: 'Aset Objek MMQ itu sendiri (Hak Tanggungan / Fidusia) + Personal Guarantee'
    }
  ]
};
