---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/*.spec.ts"
  - "**/tests/**"
---

# Aturan pengujian

Test aturan bisnis lebih penting daripada cakupan angka. Aturan berikut **wajib** punya test sebelum tahapnya dianggap selesai:

1. Peran yang tidak berhak ditolak pada setiap transisi status (uji per peran).
2. Endpoint tanpa izin eksplisit menolak (bawaan tolak).
3. Penandatangan PO tidak bisa meng-approve PO yang sama; akun admin tidak bisa meng-approve.
4. PO ditolak membuat versi baru dan perlu tanda tangan ulang; versi lama tidak berubah.
5. PDF PO yang sudah ditandatangani tidak bisa diubah; hash berubah jika file diutak-atik.
6. PO belum bisa ditandai terkirim sebelum Disetujui.
7. Angka penerimaan tidak bisa diubah; penyesuaian butuh alasan.
8. Stock hanya bisa ditambah lewat pergerakan; UPDATE dan DELETE pada pergerakan dan audit log ditolak.
9. Setiap transisi penting menghasilkan entri audit dengan nilai sebelum dan sesudah.
10. Hitungan tenggat dari T memakai hari kalender, termasuk melewati akhir bulan.
11. Sel Excel yang diawali `=`, `+`, `-`, `@` di-escape saat ekspor.

Konvensi:
- Beri nama test dengan kalimat perilaku, misalnya "menolak approval dari penandatangan PO yang sama".
- Satu perilaku per test. Data uji dibuat di test, bukan bergantung pada data bersama.
- Jangan memperlemah atau menghapus test yang gagal tanpa menjelaskan alasannya.
