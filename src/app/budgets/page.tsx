import pool from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import styles from "./page.module.css";
import BudgetTable from "./BudgetTable";

interface Budget extends RowDataPacket {
  id: number;
  nomor_pka: number;
  nama_program: string;
  waktu: string;
  freq: string;
  penerimaan: number;
  pengeluaran: number;
  bidang: string;
  keterangan: string;
}

export default async function BudgetsPage() {
  let budgets: Budget[] = [];
  let error: string | null = null;

  try {
    const [rows] = await pool.query<Budget[]>("SELECT * FROM budgets");
    budgets = rows;
  } catch (e: unknown) {
    error = e instanceof Error ? e.message : "Failed to connect to database";
  }

  if (error) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Dashboard PKA 2026-2027</h1>
          </div>
          <div className={styles.headerActions}>
            <span className={styles.badgeError}>Disconnected</span>
          </div>
        </header>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Database Connection Error</h2>
          <p>{error}</p>
          <p className={styles.errorHint}>
            Make sure XAMPP MySQL is running and the <code>pka2627</code>{" "}
            database exists.
          </p>
        </div>
      </div>
    );
  }

  // Serialize to plain objects (strip RowDataPacket prototype)
  const plainBudgets = budgets.map((b) => ({
    id: b.id,
    nomor_pka: b.nomor_pka,
    nama_program: b.nama_program,
    waktu: b.waktu,
    freq: b.freq,
    penerimaan: b.penerimaan,
    pengeluaran: b.pengeluaran,
    bidang: b.bidang,
    keterangan: b.keterangan,
  }));

  return (
    <div className={styles.container}>
      <BudgetTable budgets={plainBudgets} />
    </div>
  );
}
