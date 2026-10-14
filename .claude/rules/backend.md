---
paths:
  - "apps/api/**"
---

# Aturan backend (NestJS + Fastify)

- Satu modul per domain: stock, ur, pr, po, penerimaan, invoice, audit, auth, notifikasi.
- Validasi masuk memakai skema Zod; jangan memakai `any`. Dokumentasikan endpoint di OpenAPI.
- Setiap endpoint memakai guard otorisasi. Bawaan tolak; endpoint publik harus dinyatakan eksplisit dan dijelaskan.
- Semua perpindahan status dilakukan lewat satu method service per transisi. Method itu memeriksa: peran yang berhak, status asal yang valid, dan aturan pemisahan tugas (penandatangan ≠ approver).
- Transisi status, perubahan data penting, dan entri audit log ditulis dalam **satu transaksi database**. Tidak ada perubahan penting tanpa entri audit.
- Stock tidak pernah di-UPDATE; tambahkan catatan pergerakan. Saldo = jumlah pergerakan sampai tanggal tertentu.
- Angka penerimaan tidak boleh diubah oleh endpoint mana pun; koreksi lewat endpoint penyesuaian dengan alasan wajib.
- PO yang sudah ditandatangani: PDF dikunci, hitung dan simpan SHA-256. Penolakan membuat versi baru, bukan mengubah versi lama.
- Tenggat dan pengingat: baca dari konfigurasi; job pg-boss harus idempoten (aman dijalankan dua kali).
- Format galat konsisten (kode, pesan Indonesia untuk pengguna, tanpa detail internal). Jangan membocorkan stack trace.
- Jangan menulis aturan untuk keputusan terbuka (lihat `docs/open-decisions.md`). Jadikan konfigurasi atau tanyakan.
