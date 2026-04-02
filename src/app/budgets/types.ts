export interface Budget {
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

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
