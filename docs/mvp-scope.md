# Cakupan MVP

> Status: **USULAN**. Ubah sesuai keputusanmu sebelum dipakai sebagai patokan. Dokumen kebutuhan lengkap tidak menentukan cakupan MVP; file ini mengisi kekosongan itu.

## Tujuan MVP
Demo yang bisa diuji Pak Fauzan untuk menilai alur dan tampilan. Bukan sistem produksi. Setelah tidak ada perbaikan besar, pengembangan dilanjutkan ke sistem lengkap dengan tech stack yang sama.

## Masuk MVP (tahap 1 sampai 4)
1. **Fondasi:** skeleton repo, Docker Compose lokal (Postgres, MinIO, Mailpit), login dengan peran (Pak Fauzan, Pak Andi, Pak Nurdin, Pak Haryono, Raihan delegasi dan admin), audit log append-only.
2. **Stock:** daftar item, catatan pergerakan, input stock keluar harian oleh Pak Haryono, saldo terkini.
3. **UR → PR → PO:** alur status, nomor dokumen otomatis, PO ditandatangani dengan gambar tanda tangan, PDF dikunci beserta hash SHA-256, jumlah PR dan PO berdampingan dengan alasan.
4. **Approval:** Pak Fauzan atau delegasi menyetujui atau menolak; ditolak membuat versi baru; aturan penandatangan ≠ approver dan admin tidak bisa approve.

Data contoh: sekitar 20 item, beberapa UR, PR, dan PO dari berbagai status, supaya demo tidak dimulai dari layar kosong.

## Ditunda (setelah MVP disetujui)
- Penerimaan, verifikasi, dan penyelesaian selisih (tahap 7 dan 8)
- Invoice, perbandingan empat dokumen, dan status pembayaran (tahap 9 dan 10)
- Pengingat tenggat dan notifikasi email via pg-boss (kecuali dipicu manual untuk demo)
- Ekspor Excel
- MFA ulang untuk approval dan pembayaran, serta TOTP: **keputusan yang harus kamu ambil**. Menundanya mempercepat MVP tetapi demo menjadi tidak mewakili kontrol keamanan sebenarnya. Jika ditunda, catat di sini dan beri komentar `TODO(security)` di kode.
- Hardening produksi: backup terenkripsi dan uji restore, CSP ketat, uji penetrasi, checklist OWASP ASVS

## Cara menjalankan demo
- Pengembangan: Docker Compose lokal.
- Demo ke Pak Fauzan: frontend dan backend di-host dengan free tier. Layanan gratis bisa tertidur saat idle, jadi bangunkan beberapa menit sebelum demo. Jangan menaruh data nyata di free tier.

## Kriteria selesai MVP
- Pak Fauzan bisa menjalankan alur UR sampai PO disetujui dari awal sampai akhir tanpa bantuan.
- Test untuk aturan bisnis tahap 1 sampai 4 lulus (lihat `.claude/rules/testing.md`).
- Daftar masukan dari Pak Fauzan dicatat sebelum lanjut ke tahap berikutnya.
