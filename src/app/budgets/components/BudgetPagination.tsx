"use client";

import { PAGE_SIZE_OPTIONS } from "../types";
import styles from "../page.module.css";

interface BudgetPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalFiltered: number;
  startIdx: number;
  endIdx: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function BudgetPagination({
  currentPage,
  totalPages,
  pageSize,
  totalFiltered,
  startIdx,
  endIdx,
  onPageChange,
  onPageSizeChange,
}: BudgetPaginationProps) {
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

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <div className={styles.pageSizeControl}>
        <label htmlFor="pageSize">Rows per page:</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
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
        Showing {totalFiltered > 0 ? startIdx + 1 : 0}–
        {Math.min(endIdx, totalFiltered)} of {totalFiltered}
      </div>

      <div className={styles.pageControls}>
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
              onClick={() => onPageChange(page)}
              className={`${styles.pageBtn} ${
                currentPage === page ? styles.pageBtnActive : ""
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={styles.pageBtn}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}
