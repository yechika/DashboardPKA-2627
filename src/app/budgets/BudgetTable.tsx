"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./page.module.css";

interface Budget {
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

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getBidangTheme(bidang: string): string {
  const b = bidang?.toLowerCase().trim() || "";
  if (b === "tpg") return styles.bidangTPG;
  if (b === "pelkes") return styles.bidangPelkes;
  if (b === "germasa") return styles.bidangGermasa;
  if (b === "ppsdi") return styles.bidangPpsdi;
  if (b === "peg") return styles.bidangPEG;
  if (b === "il") return styles.bidangIL;
  return "";
}

export default function BudgetTable({ budgets }: { budgets: Budget[] }) {
  const { theme, toggleTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const closeModal = useCallback(() => setSelectedBudget(null), []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
    }
    if (selectedBudget) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedBudget, closeModal]);

  const filteredBudgets = budgets.filter((b) =>
    b.nama_program.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredBudgets.length / pageSize) || 1;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentRows = filteredBudgets.slice(startIdx, endIdx);

  function handlePageSizeChange(newSize: number) {
    setPageSize(newSize);
    setCurrentPage(1);
  }

  function getPageNumbers(): (number | "...")[] {
    const pages: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Dashboard PKA 2026-2027</h1>
        </div>
        <div className={styles.headerActions}>
          <input
            type="text"
            placeholder="Search by nama program..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
          <span className={styles.badgeSuccess}>
            {filteredBudgets.length} records
          </span>
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
            {currentRows.map((row) => (
              <tr key={row.id}>
                <td className={styles.idCell}>{row.id}</td>
                <td>{row.nomor_pka}</td>
                <td className={styles.programCell}>
                  <button
                    className={styles.programLink}
                    onClick={() => setSelectedBudget(row)}
                    title="Click to view details"
                  >
                    {row.nama_program}
                  </button>
                </td>
                <td>{row.waktu}</td>
                <td>{row.freq}</td>
                <td className={`${styles.numericCol} ${styles.income}`}>
                  {formatCurrency(row.penerimaan)}
                </td>
                <td className={`${styles.numericCol} ${styles.expense}`}>
                  {formatCurrency(row.pengeluaran)}
                </td>
                <td>
                  <span
                    className={`${styles.bidangTag} ${getBidangTheme(row.bidang)}`}
                  >
                    {row.bidang}
                  </span>
                </td>
                <td className={styles.keteranganCell}>
                  {row.keterangan || "—"}
                </td>
              </tr>
            ))}
            {currentRows.length === 0 && (
              <tr>
                <td colSpan={9} className={styles.emptyRow}>
                  No budget data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div className={styles.pageSizeControl}>
            <label htmlFor="pageSize">Rows per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className={styles.pageSizeSelect}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.pageInfo}>
            Showing {filteredBudgets.length > 0 ? startIdx + 1 : 0}–
            {Math.min(endIdx, filteredBudgets.length)} of{" "}
            {filteredBudgets.length}
          </div>

          <div className={styles.pageControls}>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={styles.pageBtn}
              aria-label="Previous page"
            >
              ‹
            </button>

            {getPageNumbers().map((page, idx) =>
              page === "..." ? (
                <span key={`ellipsis-${idx}`} className={styles.pageEllipsis}>
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${styles.pageBtn} ${
                    currentPage === page ? styles.pageBtnActive : ""
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedBudget && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Program Detail</h2>
              <button
                onClick={closeModal}
                className={styles.modalClose}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.detailGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>ID</span>
                  <span className={styles.detailValue}>
                    {selectedBudget.id}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>No. PKA</span>
                  <span className={styles.detailValue}>
                    {selectedBudget.nomor_pka}
                  </span>
                </div>
                <div className={`${styles.detailItem} ${styles.detailFull}`}>
                  <span className={styles.detailLabel}>Nama Program</span>
                  <span
                    className={`${styles.detailValue} ${styles.detailHighlight}`}
                  >
                    {selectedBudget.nama_program}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Waktu</span>
                  <span className={styles.detailValue}>
                    {selectedBudget.waktu}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Freq</span>
                  <span className={styles.detailValue}>
                    {selectedBudget.freq}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Penerimaan</span>
                  <span className={`${styles.detailValue} ${styles.income}`}>
                    {formatCurrency(selectedBudget.penerimaan)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Pengeluaran</span>
                  <span className={`${styles.detailValue} ${styles.expense}`}>
                    {formatCurrency(selectedBudget.pengeluaran)}
                  </span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Bidang</span>
                  <span className={styles.detailValue}>
                    <span
                      className={`${styles.bidangTag} ${getBidangTheme(selectedBudget.bidang)}`}
                    >
                      {selectedBudget.bidang}
                    </span>
                  </span>
                </div>
                <div className={`${styles.detailItem} ${styles.detailFull}`}>
                  <span className={styles.detailLabel}>Keterangan</span>
                  <span className={styles.detailKeterangan}>
                    {selectedBudget.keterangan || "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
