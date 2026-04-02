"use client";

import { useState } from "react";
import { Budget } from "./types";
import { formatCurrency, getBidangTheme } from "./utils";
import BudgetHeader from "./components/BudgetHeader";
import BudgetPagination from "./components/BudgetPagination";
import BudgetRowModal from "./components/BudgetRowModal";
import styles from "./page.module.css";

export default function BudgetTable({ budgets }: { budgets: Budget[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBidang, setSelectedBidang] = useState("");

  const bidangOptions = Array.from(
    new Set(budgets.map((b) => b.bidang).filter(Boolean)),
  ).sort();

  const filteredBudgets = budgets.filter((b) => {
    const matchesSearch = b.nama_program
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBidang =
      selectedBidang === "" ||
      b.bidang?.toLowerCase().trim() === selectedBidang.toLowerCase().trim();
    return matchesSearch && matchesBidang;
  });

  const totalPages = Math.ceil(filteredBudgets.length / pageSize) || 1;
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const currentRows = filteredBudgets.slice(startIdx, endIdx);

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  };

  const handleBidangChange = (b: string) => {
    setSelectedBidang(b);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  return (
    <>
      <BudgetHeader
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedBidang={selectedBidang}
        onBidangChange={handleBidangChange}
        bidangOptions={bidangOptions}
        filteredCount={filteredBudgets.length}
      />

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

      <BudgetPagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalFiltered={filteredBudgets.length}
        startIdx={startIdx}
        endIdx={endIdx}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />

      <BudgetRowModal
        selectedBudget={selectedBudget}
        onClose={() => setSelectedBudget(null)}
      />
    </>
  );
}
