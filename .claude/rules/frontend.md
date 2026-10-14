---
paths:
  - "apps/web/**"
---

# Aturan frontend (React + Vite)

- TypeScript ketat. State server lewat TanStack Query; jangan menyalin data server ke state lokal tanpa alasan.
- Skema Zod untuk form; pesan galat dalam bahasa Indonesia.
- Komponen UI memakai shadcn/ui dan Tailwind; jangan menambah library UI lain.
- Menyembunyikan atau menonaktifkan tombol sesuai peran hanya untuk kenyamanan. Server tetap yang memutuskan.
- Tampilkan selalu: nomor dokumen, status, dan (untuk UR dan PR) tanggal saldo stock yang dipakai.
- Di tampilan PO, tampilkan jumlah PR dan PO berdampingan beserta alasan perbedaannya.
- Form penerimaan: simpan otomatis sebagai draft dan tampilkan waktu sinkron terakhir (wifi kapal bisa tersendat).
- Angka penerimaan yang sudah tercatat tidak bisa diedit di UI; sediakan alur "penyesuaian" dengan alasan.
- Aksi approval dan pembayaran meminta verifikasi MFA ulang; tangani layar verifikasinya.
- Jangan menyimpan token atau data sensitif di localStorage.
