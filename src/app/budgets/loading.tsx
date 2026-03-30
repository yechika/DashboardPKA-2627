import styles from "./page.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Dashboard PKA 2026-2027</h1>
          <p className={styles.subtitle}>Loading data…</p>
        </div>
      </header>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>No. PKA</th>
              <th>Nama Program</th>
              <th>Waktu</th>
              <th>Freq</th>
              <th className={styles.numericCol}>Penerimaan</th>
              <th className={styles.numericCol}>Pengeluaran</th>
              <th>Bidang</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 4 }).map((_, i) => (
              <tr key={i}>
                {Array.from({ length: 9 }).map((_, j) => (
                  <td key={j}>
                    <div
                      style={{
                        height: "1rem",
                        borderRadius: "4px",
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%)",
                        backgroundSize: "200% 100%",
                        animation: "shimmer 1.5s ease-in-out infinite",
                        width: j === 0 ? "2rem" : j === 2 ? "10rem" : "5rem",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    </div>
  );
}
