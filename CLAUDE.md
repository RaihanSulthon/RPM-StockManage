# Stock Management Catering Kapal

Aplikasi web internal untuk mencatat stock, permintaan (UR), pembelian (PR, PO), penerimaan barang, dan pencocokan invoice katering di kapal pesiar. Satu gudang di kapal; pengendalian stock dari kantor pusat Jakarta.

## Dokumen rujukan (baca hanya saat relevan, jangan diimpor dengan @)
- `docs/requirements.md`: sumber kebenaran kebutuhan
- `docs/mvp-scope.md`: apa yang dikerjakan sekarang dan apa yang ditunda
- `docs/open-decisions.md`: keputusan yang belum diputuskan

Jika kode bertentangan dengan `docs/requirements.md`, dokumen yang benar. Jika dokumen ambigu atau diam, tanyakan; jangan menebak.

## Stack
- Frontend: React + TypeScript + Vite (SPA), Tailwind + shadcn/ui, TanStack Query, Zod
- Backend: Node.js 24 LTS + NestJS (adapter Fastify), REST + OpenAPI
- Database: PostgreSQL 18; ORM Prisma atau Drizzle (BELUM dipilih, lihat open-decisions)
- Job terjadwal: pg-boss. PDF: pdf-lib atau PDFKit. Excel: ExcelJS
- Versi di dokumen adalah posisi per 12 Okt 2026. Cek versi yang terpasang di mesin; jangan menganggap angka di dokumen masih benar.

## Struktur repo (rencana; perbarui setelah skeleton ada)
- `apps/web`: frontend
- `apps/api`: backend
- `docs/`: dokumen rujukan
- `docker-compose.yml`: Postgres, MinIO (pengganti S3), Mailpit (tangkap email) untuk lokal

## Perintah
TODO: isi setelah skeleton ada (install, dev, test, lint, migrate). Jangan mengarang perintah; baca `package.json`.

## Aturan keras (berlaku di semua tugas)
1. Keputusan terbuka (`docs/open-decisions.md`) JANGAN diimplementasikan sebagai keputusan. Jadikan konfigurasi atau data per item, atau tanyakan dulu.
2. Tenggat (H-10, H-9, H-8, H-7, H-5) adalah konfigurasi, bukan angka di kode. H = hari kalender dari T (tanggal barang diminta tiba).
3. Otorisasi dicek di server pada setiap endpoint. Bawaan: tolak.
4. Stock = catatan pergerakan (append-only). Saldo dihitung dari pergerakan.
5. Audit log hanya bisa ditambah: siapa, kapan, nilai sebelum dan sesudah.
6. Angka penerimaan (catatan fisik) tidak pernah diubah; koreksi lewat penyesuaian dengan alasan.
7. PDF PO yang sudah ditandatangani dikunci; simpan hash SHA-256. Ditolak = versi baru + tanda tangan ulang.
8. Penandatangan PO tidak boleh menjadi approver PO yang sama. Akun admin tidak bisa meng-approve.
9. Hanya Pak Andi yang membuat PO. Vendor bukan pengguna sistem.

Aturan rinci: `.claude/rules/` (domain dan keamanan dimuat tiap sesi; backend, frontend, database, testing dimuat saat menyentuh file terkait).

## Cara kerja
- Rencanakan dulu dan tunggu persetujuan sebelum menulis kode.
- Satu tahap (irisan vertikal) per sesi. Jangan mengerjakan tahap lain.
- Tulis test untuk aturan bisnis di atas. Jalankan test dan lint sebelum menyatakan selesai.
- Jangan menambah dependensi tanpa menyebut alasannya.
- Jangan membaca atau mengubah `.env`. Rahasia tidak masuk repo.
- Di akhir tiap tugas, sebutkan: apa yang berubah, apa yang belum teruji, asumsi yang dibuat.

## Bahasa
- Kode, nama variabel, pesan commit: Inggris
- Teks antarmuka dan dokumen: Indonesia
