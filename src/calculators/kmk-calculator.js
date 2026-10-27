/**
 * Kalkulator Realistis Pembiayaan Modal Kerja (KMK) SPK
 * Akad Musyarakah Line Facility
 */

export function hitungKMKMusyarakah({
  nilaiSpk = 1000000000,
  porsiBankPct = 80,
  tenorBulan = 4,
  eqRatePct = 12.0,
  jumlahTermin = 3
}) {
  const porsiBank = nilaiSpk * (porsiBankPct / 100);
  const selfFinancingNasabah = nilaiSpk - porsiBank;
  
  // Perhitungan bagi hasil estimasi setara equivalent rate
  const totalBagiHasilBank = porsiBank * (eqRatePct / 100) * (tenorBulan / 12);
  const totalKewajibanBank = porsiBank + totalBagiHasilBank;
  
  // Proyeksi alur termin escrow
  const terminList = [];
  const nominalTermin = nilaiSpk / jumlahTermin;
  const porsiPokokPerTermin = porsiBank / jumlahTermin;
  const bagiHasilPerTermin = totalBagiHasilBank / jumlahTermin;
  const totalPotongBankPerTermin = porsiPokokPerTermin + bagiHasilPerTermin;
  const sisaKeGiroPerTermin = nominalTermin - totalPotongBankPerTermin;
  
  let sisaBakiDebet = porsiBank;
  
  for (let i = 1; i <= jumlahTermin; i++) {
    sisaBakiDebet = Math.max(0, sisaBakiDebet - porsiPokokPerTermin);
    terminList.push({
      terminKe: i,
      nilaiTermin: nominalTermin,
      potongPokok: porsiPokokPerTermin,
      potongBagiHasil: bagiHasilPerTermin,
      totalPotongBank: totalPotongBankPerTermin,
      sisaRilisNasabah: sisaKeGiroPerTermin,
      sisaBakiDebet: sisaBakiDebet
    });
  }

  return {
    nilaiSpk,
    porsiBankPct,
    porsiBank,
    selfFinancingNasabah,
    tenorBulan,
    eqRatePct,
    totalBagiHasilBank,
    totalKewajibanBank,
    jumlahTermin,
    terminList
  };
}

export function formatRupiah(val) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(val);
}
