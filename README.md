# AkadSyariah 101: KMK Musyarakah Line Facility & Kredit Investasi MMQ

Interactive Sharia Banking Education & Risk Management Web Platform.

Aplikasi web modern berbasis **Vite.js**, **Three.js (3D Interactive Visualizer)**, dan **Anime.js** yang menyajikan panduan mendalam dan simulasi pembiayaan perbankan syariah dari sudut pandang Bank (Risk Management & Relationship Manager).

---

## 🏛️ Fokus Pembahasan Akad Utama

### 1. Kredit Modal Kerja (KMK) SPK Umum / PMK: **Musyarakah Line Facility**
- **Filosofi & Rasional Bank:** Pembiayaan modal kerja proyek berbasis SPK/Kontrak konstruksi atau pengadaan barang/jasa. Bank dan nasabah bermitra (*Syirkah al-'Inan*) menyatukan modal.
- **Struktur Line Facility:** Plafon induk tahunan dengan penarikan bertahap per Promes (Surat Sanggup) berbasis SPK Bouwheer yang telah diverifikasi (3-6 bulan).
- **Rekening Escrow:** Pembayaran termin dari Bouwheer dialirkan wajib ke Rekening Escrow untuk auto-debet pengembalian pokok promes dan bagi hasil bank sesuai nisbah yang disepakati (*equivalent rate* 11% - 13% p.a.).
- **6 Tahapan Siklus Transaksi:** Dari *SPK Due Diligence*, *Akad & Cessie*, *Pencairan Promes*, *Monitoring Fisik*, *Incoming Billing Escrow*, hingga *Penihilan Baki Debet*.

### 2. Kredit Investasi (KI): **Musyarakah Mutanaqisah (MMQ)**
- **Filosofi & Rasional Bank:** Pembiayaan aset produktif jangka menengah-panjang (pabrik, mesin industri, alat berat, gedung komersial).
- **Dual-Contract Hybrid:**
  1. *Syirkah Al-Mulk:* Bank (80%) dan nasabah (20%) membeli aset bersama dari vendor.
  2. *Ijarah:* Bank menyewakan porsi kepemilikannya (*hishshah*) kepada nasabah untuk mendapatkan Ujrah bulanan.
  3. *Gradual Buyback (Ba'i):* Setiap bulan nasabah mencicil pembelian porsi bank sehingga porsi bank menyusut dari 80% ke 0%.
  4. *Tamlik:* Di akhir tenor, aset 100% beralih menjadi hak milik mutlak nasabah.

---

## 🚀 Fitur Unggulan

- **3D Interactive Scene (Three.js):**
  - **KMK Mode:** Model 3D interaktif visualisasi aliran modal Bank (Emerald) dan Nasabah (Gold) ke inti proyek SPK dengan cincin Escrow.
  - **MMQ Mode:** Model 3D aset bertingkat yang porsi kepemilikannya dapat digeser menggunakan slider bulan secara real-time (melihat porsi bank menyusut dan porsi nasabah membesar hingga 100%).
- **Micro-Animations (Anime.js):** Animasi transisi tab, kartu alur transaksi, dan counter kalkulator yang halus.
- **Main Theme Cerah:** Desain bertema cerah (*Light theme*) profesional perbankan syariah: *Clean Ivory*, *Emerald Green*, dan *Islamic Gold*.
- **Kalkulator Keuangan Terintegrasi:**
  - Simulasi KMK SPK: Plafon, Bagi Hasil, Pemotongan Pokok & Sisa Cair ke Giro Nasabah per Termin.
  - Simulasi KI MMQ: Uang Muka, Hishshah Bank, Jadwal Angsuran Menurun (Ujrah + Pokok Beli), dan Amortisasi Kepemilikan.
- **Matriks Komparasi Head-to-Head:** 10 parameter perbankan membedakan KMK Musyarakah vs KI MMQ.

---

## 🛠️ Panduan Menjalankan & Deploy

### Jalankan Lokal:
```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Build untuk production
npm run build
```

### Deploy ke Vercel:
1. Masuk ke [Vercel Dashboard](https://vercel.com/new).
2. Import repository `elpsycongroo75/akadsyariah101`.
3. Vercel akan otomatis mendeteksi preset **Vite**:
   - **Build Command:** `vite build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Klik **Deploy** dan selesai! 🎉
