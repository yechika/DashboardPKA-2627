"use client";

import { useTheme } from "@/components/ThemeProvider";
import styles from "../page.module.css";

interface BudgetHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedBidang: string;
  onBidangChange: (b: string) => void;
  bidangOptions: string[];
  filteredCount: number;
}

export default function BudgetHeader({
  searchQuery,
  onSearchChange,
  selectedBidang,
  onBidangChange,
  bidangOptions,
  filteredCount,
}: BudgetHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>Dashboard PKA 2026-2027</h1>
      </div>
      <div className={styles.headerActions}>
        <input
          type="text"
          placeholder="Cari..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={selectedBidang}
          onChange={(e) => onBidangChange(e.target.value)}
          className={styles.filterSelect}
          aria-label="Filter by Bidang"
        >
          <option value="">Semua Bidang</option>
          {bidangOptions.map((bidang) => (
            <option key={bidang} value={bidang}>
              {bidang}
            </option>
          ))}
        </select>
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
        <span className={styles.badgeSuccess}>{filteredCount} hasil</span>
      </div>
    </header>
  );
}
