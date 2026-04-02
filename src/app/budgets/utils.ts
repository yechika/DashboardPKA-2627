import styles from "./page.module.css";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getBidangTheme(bidang: string): string {
  const b = bidang?.toLowerCase().trim() || "";
  if (b === "tpg") return styles.bidangTPG;
  if (b === "pelkes") return styles.bidangPelkes;
  if (b === "germasa") return styles.bidangGermasa;
  if (b === "ppsdi") return styles.bidangPpsdi;
  if (b === "peg") return styles.bidangPEG;
  if (b === "il") return styles.bidangIL;
  return "";
}
