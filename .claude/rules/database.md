---
paths:
  - "**/prisma/**"
  - "**/drizzle/**"
  - "**/migrations/**"
---

# Aturan database (PostgreSQL 18)

Pilihan ORM (Prisma atau Drizzle) belum diputuskan. Jangan mencampur keduanya.

- Tabel `stock_movements` hanya menerima INSERT. Cabut hak UPDATE dan DELETE dari peran aplikasi, atau pasang trigger yang menolaknya. Saldo dihitung dari pergerakan.
- Tabel `audit_log` hanya INSERT, dengan penjagaan yang sama. Kolom minimal: siapa, kapan, entitas, aksi, nilai sebelum, nilai sesudah.
- Angka penerimaan fisik disimpan sekali dan tidak diubah. Koreksi di tabel penyesuaian terpisah dengan alasan wajib dan pelaku.
- PO punya tabel versi: nomor versi, referensi file PDF, hash SHA-256, penandatangan, waktu tanda tangan. Versi lama tidak pernah ditimpa.
- Simpan jumlah PR dan PO berdampingan, plus kolom alasan bila berbeda.
- Setiap dokumen punya nomor otomatis yang unik dan riwayat status.
- Atribut item (siklus, kedaluwarsa, batas minimum dan maksimum) adalah kolom data per item, bukan konstanta di kode.
- Tenggat dan konfigurasi tahap disimpan sebagai data konfigurasi.
- Uang memakai tipe `numeric` (atau bilangan bulat satuan terkecil), tidak pernah float. Waktu memakai `timestamptz` (UTC).
- Migrasi yang sudah digabung ke branch utama tidak diedit; buat migrasi baru.
- Beri indeks pada kunci asing dan kolom yang sering dicari (nomor dokumen, status, tanggal).
