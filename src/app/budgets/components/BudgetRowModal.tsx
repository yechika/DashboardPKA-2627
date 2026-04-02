"use client";

import { useCallback, useEffect } from "react";
import { Budget } from "../types";
import { formatCurrency, getBidangTheme } from "../utils";
import styles from "../page.module.css";

interface BudgetRowModalProps {
  selectedBudget: Budget | null;
  onClose: () => void;
}

export default function BudgetRowModal({
  selectedBudget,
  onClose,
}: BudgetRowModalProps) {
  const closeModal = useCallback(() => onClose(), [onClose]);

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

  if (!selectedBudget) return null;

  return (
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
              <span className={styles.detailValue}>{selectedBudget.id}</span>
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
              <span className={styles.detailValue}>{selectedBudget.waktu}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Freq</span>
              <span className={styles.detailValue}>{selectedBudget.freq}</span>
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
  );
}
