# Aturan domain (dimuat tiap sesi)

Sumber lengkap: `docs/requirements.md`. File ini hanya ringkasan yang harus selalu diingat.

## Peran dan hak
| Pengguna | Peran di sistem | Boleh | Tidak boleh |
|---|---|---|---|
| Pak Fauzan (Owner) | Approver akhir PO, penerima invoice, pembayaran | Setujui/tolak PO, input invoice, catat pembayaran, lihat semua laporan dan audit log | Membuat PO |
| Pak Andi | Pembuat PO | Validasi PR, buat dan tandatangani PO, tandai PO terkirim, putuskan penyelesaian selisih penerimaan | Menyetujui PO sendiri |
| Pak Nurdin (Jakarta) | Pengendali stock dan verifikator | Evaluasi UR, buat PR, terbitkan Penerimaan Terverifikasi | Membuat PO, mengubah angka penerimaan |
| Pak Haryono (head chef di kapal) | Pelaksana lapangan | Catat stock keluar harian, buat UR, catat penerimaan barang, unggah foto surat jalan | Memverifikasi penerimaan sendiri |
| Raihan: akun delegasi | Approval atas nama Pak Fauzan bila diaktifkan Pak Fauzan | Setujui/tolak PO (hanya saat delegasi aktif) | Tugas admin |
| Raihan: akun admin | Admin sistem | Kelola pengguna dan konfigurasi | Meng-approve apa pun |

Dua akun Raihan harus terpisah. Vendor bukan pengguna sistem.

## Alur (10 tahap)
Harian → UR → PR → PO (tanda tangan, PDF dikunci) → Approval → Kirim PO (di luar sistem, ditandai di sistem) → Penerimaan → Verifikasi → Invoice (4 dokumen dibandingkan) → Pembayaran.

## Status dokumen
- UR: Draft, Dikirim, Dievaluasi
- PR: Draft, Diajukan, Divalidasi
- PO: Draft, Ditandatangani, Menunggu approval, Disetujui atau Ditolak, Terkirim ke vendor. Ditolak = versi baru, kembali ke Draft
- Penerimaan: Dicatat, Terverifikasi atau Selisih, Selisih diputuskan
- Invoice: Diterima, Dibandingkan, Valid atau Selisih, Dibayar atau Ditahan

Setiap dokumen punya nomor otomatis dan riwayat perubahan. Pindah status hanya oleh peran yang berhak di atas.

## Aturan bisnis penting
- Jumlah di PO boleh beda dari PR; Pak Andi wajib mengisi alasan; simpan jumlah PR dan PO berdampingan.
- PO hanya boleh ditandai terkirim setelah Disetujui (Pak Fauzan, atau Raihan sebagai delegasi).
- Invoice harus sama persis dengan barang yang diterima (terverifikasi) dan dengan PO. Toleransi selisih belum diputuskan (lihat open-decisions); bawaan: harus sama persis.
- Pembayaran hanya setelah barang diterima dan invoice valid. Pembayaran parsial belum diputuskan; jangan diimplementasikan.
- Pengiriman PO ke vendor dan pembayaran/termin ada di luar sistem; sistem hanya mencatat status, tanggal bayar, dan catatan.
- Setiap UR dan PR mencantumkan tanggal saldo stock yang dipakai.
- Formula kebutuhan 2 minggu tidak diotomatiskan dulu; sistem menyimpan jumlah dan alasan.
- Sistem menghitung tenggat otomatis dari T, mengirim pengingat per tahap, menandai tahap terlambat, dan memberi tahu atasannya.
