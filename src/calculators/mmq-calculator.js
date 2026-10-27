/**
 * Kalkulator Realistis Kredit Investasi (KI)
 * Akad Musyarakah Mutanaqisah (MMQ)
 */

export function hitungKI_MMQ({
  nilaiAset = 2500000000,
  uangMukaPct = 20,
  tenorTahun = 5,
  ujrahRatePct = 10.5
}) {
  const porsiNasabahAwal = nilaiAset * (uangMukaPct / 100);
  const hishshahBankAwal = nilaiAset - porsiNasabahAwal;
  const totalBulan = tenorTahun * 12;
  
  // Porsi beli hishshah bank per bulan (pokok)
  const pokokHishshahPerBulan = hishshahBankAwal / totalBulan;
  
  let sisaHishshah = hishshahBankAwal;
  let totalUjrahDibayar = 0;
  const amortisasiSchedule = [];
  
  for (let bulan = 1; bulan <= totalBulan; bulan++) {
    const ujrahBulanIni = sisaHishshah * (ujrahRatePct / 100) / 12;
    const angsuranTotalBulanIni = pokokHishshahPerBulan + ujrahBulanIni;
    totalUjrahDibayar += ujrahBulanIni;
    
    const porsiBankPct = (sisaHishshah / nilaiAset) * 100;
    const porsiNasabahPct = 100 - porsiBankPct;
    
    sisaHishshah = Math.max(0, sisaHishshah - pokokHishshahPerBulan);
    
    amortisasiSchedule.push({
      bulan,
      sisaHishshahAwal: sisaHishshah + pokokHishshahPerBulan,
      pokokBeli: pokokHishshahPerBulan,
      ujrahSewa: ujrahBulanIni,
      totalAngsuran: angsuranTotalBulanIni,
      sisaHishshahAkhir: sisaHishshah,
      porsiBankPct: Math.max(0, (sisaHishshah / nilaiAset) * 100),
      porsiNasabahPct: Math.min(100, 100 - ((sisaHishshah / nilaiAset) * 100))
    });
  }

  const angsuranBulanPertama = amortisasiSchedule[0].totalAngsuran;
  const angsuranBulanTerakhir = amortisasiSchedule[totalBulan - 1].totalAngsuran;
  const totalPengembalian = hishshahBankAwal + totalUjrahDibayar;

  return {
    nilaiAset,
    uangMukaPct,
    porsiNasabahAwal,
    hishshahBankAwal,
    tenorTahun,
    totalBulan,
    ujrahRatePct,
    pokokHishshahPerBulan,
    totalUjrahDibayar,
    totalPengembalian,
    angsuranBulanPertama,
    angsuranBulanTerakhir,
    amortisasiSchedule
  };
}
