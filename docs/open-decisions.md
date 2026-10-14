# Keputusan terbuka

Sumber: `docs/requirements.md`, bagian "Keputusan terbuka". Kolom usulan hanya titik awal diskusi, **bukan keputusan**.

**Instruksi untuk Claude Code:** jangan mengimplementasikan keputusan di bawah sebagai hal yang pasti. Jika sebuah tugas bergantung padanya, jadikan konfigurasi atau data, atau tanyakan dulu.

| # | Keputusan | Pemilik | Usulan sementara | Status | Perlakuan di kode |
|---|---|---|---|---|---|
| 1 | Toleransi selisih (nominal, kualitas, kuantitas) | Raihan dan Pak Fauzan | Bawaan harus sama persis; Pak Fauzan boleh menyetujui selisih dengan alasan tercatat | Terbuka | Bawaan: harus sama persis. Persetujuan selisih jangan dibangun dulu |
| 2 | Pembayaran bila vendor mengirim sebagian | Pak Fauzan | Belum ada usulan. Pilihan: bayar sesuai yang diterima, atau tahan sampai lengkap | Terbuka | Jangan diimplementasikan |
| 3 | Pengganti Pak Andi | Pak Fauzan dan Pak Andi | Belum dibahas. Tanpa pengganti, PO tertahan saat Pak Andi berhalangan | Terbuka | Jangan membuat peran pengganti |
| 4 | Tenggat UR, PR, dan penyusunan PO (H-10, H-9, H-8) | Pak Fauzan, Pak Andi, Pak Nurdin, Pak Haryono | Angka contoh perlu diganti dengan yang disepakati | Terbuka | Konfigurasi, bukan konstanta |
| 5 | Aturan bahan vs barang (siklus, kedaluwarsa, batas min dan maks) | Raihan dan Pak Fauzan | Atribut diatur per item, bukan di kode | Terbuka | Kolom data per item |
| 6 | Termin pembayaran | Pak Fauzan | Di luar sistem; sistem hanya mencatat status | Terbuka | Hanya status, tanggal bayar, catatan |
| 7 | Formula perhitungan kebutuhan 2 minggu | Pak Andi | Tidak diotomatiskan dulu; sistem menyimpan jumlah dan alasan | Terbuka | Jangan otomatiskan |
| 8 | Library autentikasi dan penyedia hosting | Raihan | Diputuskan saat implementasi; kandidat library: BetterAuth | Terbuka | Tanyakan sebelum memilih |

Tambahan di luar delapan di atas: ORM (Prisma atau Drizzle) belum dipilih.

## Usulan turunan yang perlu dikonfirmasi
- Jumlah pesanan dihitung dari kebutuhan 2 minggu siklus berikutnya dikurangi proyeksi sisa stock saat barang tiba (saldo saat ini dikurangi pemakaian sampai T). Dokumen menyebutnya usulan turunan yang perlu dikonfirmasi; jangan dianggap aturan final.
- Tenggat tahap sebelum PO (UR H-10, PR H-9, PO disusun H-8) adalah contoh. Yang sudah disepakati: approval target H-7 dan PO sampai vendor paling lambat H-5 (syarat vendor).

## Hal di dokumen kebutuhan yang perlu kamu putuskan (ditemukan saat memeriksa)
- **Wifi kapal:** bagian teknologi dan asumsi menyatakan wifi stabil dan tidak ada mode offline, tetapi bagian risiko menyatakan wifi bisa tersendat dan form penerimaan disimpan otomatis sebagai draft. Putuskan: cukup draft otomatis di browser dengan penanda waktu sinkron, atau perlu mode offline sungguhan. Sampai diputuskan, kode memakai draft otomatis saja.
- **Gambar tanda tangan di PDF** bukan tanda tangan elektronik tersertifikasi; kekuatan hukumnya perlu dicek ke ahli hukum.
