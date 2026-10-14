# Aturan keamanan (dimuat tiap sesi)

Berlaku juga untuk MVP, kecuali `docs/mvp-scope.md` menyatakan eksplisit bahwa suatu kontrol ditunda. Jika ditunda, tulis komentar `TODO(security)` di kode dan catat di mvp-scope.

## Autentikasi dan sesi
- Tanpa registrasi mandiri; akun dibuat admin.
- Password di-hash dengan Argon2id.
- TOTP wajib untuk Pak Fauzan, Pak Andi, dan akun delegasi.
- Approval dan pembayaran meminta verifikasi MFA ulang.
- Sesi memakai cookie HttpOnly, Secure, SameSite; ada batas waktu diam dan pembatasan percobaan login.
- Pilihan library autentikasi belum diputuskan (kandidat: BetterAuth). Jangan memilih diam-diam; tanyakan.

## Otorisasi
- Dicek di server pada setiap endpoint; bawaan tolak. Menyembunyikan tombol di UI bukan otorisasi.
- Penandatangan PO tidak boleh menjadi approver; akun admin tidak bisa meng-approve.

## Integritas data
- Audit log hanya bisa ditambah (tanpa UPDATE/DELETE).
- Simpan hash SHA-256 PDF PO final untuk mendeteksi perubahan.
- Stock disimpan sebagai catatan pergerakan.

## Input dan keluaran
- Validasi semua input di server (Zod atau setara); query terparameter; tidak ada SQL yang dirangkai dari string.
- CSP dan CORS ketat; proteksi CSRF.
- Unggahan divalidasi isinya (bukan hanya ekstensi). File disimpan di bucket privat; akses lewat URL bertanda tangan berumur pendek.
- Sel Excel hasil ekspor di-escape terhadap formula injection (nilai diawali `=`, `+`, `-`, `@`).

## Rahasia dan infrastruktur
- Rahasia tidak masuk repo; pakai variabel lingkungan lokal atau secret manager. `.env` tidak boleh dibaca atau di-commit; sediakan `.env.example`.
- Database tidak terbuka ke internet; TLS di lingkungan yang di-host.
- Jangan mencatat password, token, atau data sensitif ke log.
