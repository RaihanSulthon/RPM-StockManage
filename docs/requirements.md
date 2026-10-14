# Dokumen Kebutuhan: Stock Management Catering Kapal

> Dikonversi dari PDF (12 Okt 2026, @Raihan Sulthon) ke Markdown. **Bandingkan dengan PDF asli** sebelum dijadikan sumber kebenaran; tabel hasil konversi mudah keliru. Diagram swimlane lengkap ada di `Stock_Management_Alur_Lengkap_v2.drawio`.

Sistem ini mencatat stock, permintaan, pembelian, penerimaan barang, dan tagihan untuk katering di kapal pesiar, dengan aturan dan peran yang sudah disepakati bersama Pak Fauzan.

## Tujuan dan lingkup

Sistem menggantikan pencatatan manual stock, permintaan, pembelian, penerimaan, dan pencocokan tagihan, supaya setiap angka punya penanggung jawab, jejak perubahan, dan tenggat yang jelas. Katering beroperasi di kapal pesiar dengan satu gudang di kapal, sedangkan pengendalian stock dilakukan dari kantor pusat Jakarta.

**Di dalam sistem:**
- Pencatatan stock keluar harian dan penerimaan barang
- UR, PR, PO (PDF bertanda tangan) dan approval
- Perbandingan otomatis PO, surat jalan, penerimaan, dan invoice
- Notifikasi, pengingat tenggat, dan audit log

**Di luar sistem:**
- Pengiriman PO ke vendor (WhatsApp, email, atau lainnya, bebas)
- Vendor bukan pengguna sistem
- Pembayaran dan termin; sistem hanya mencatat status bayar, tanggal bayar, dan catatan

## Pengguna dan peran

Empat pengguna utama, ditambah satu delegasi untuk Pak Fauzan. Hierarki perusahaan dan wewenang di sistem tidak selalu sama: Pak Andi bawahan Pak Fauzan, tetapi di sistem keduanya sejajar dalam hal pembuatan dan persetujuan. Pak Andi belum punya pengganti; ini dicatat sebagai keputusan terbuka.

| Pengguna | Posisi di perusahaan | Peran di sistem | Hak utama |
|---|---|---|---|
| Pak Fauzan | Owner | Approver akhir PO, penerima invoice, pembayaran | Setujui atau tolak PO, input invoice, lihat semua laporan dan audit log |
| Pak Andi | Bawahan Pak Fauzan | Pembuat PO | Hitung kebutuhan 2 minggu, buat dan tanda tangani PO, putuskan penyelesaian selisih penerimaan |
| Pak Nurdin | Bawahan Pak Andi, di Jakarta | Pengendali stock dan verifikator | Evaluasi UR, buat PR, terbitkan Penerimaan Terverifikasi |
| Pak Haryono | Bawahan Pak Nurdin, head chef di kapal | Pelaksana lapangan | Catat stock keluar harian, buat UR, catat penerimaan barang dari vendor |
| Raihan | Pengganti Pak Fauzan | Delegasi approval dan admin sistem | Approval atas nama Pak Fauzan bila diaktifkan Pak Fauzan; akun admin dipisah dari akun delegasi |

## Istilah

Semua orang memakai istilah berikut dengan arti yang sama.

| Istilah | Arti | Pembuat |
|---|---|---|
| UR (User Request) | Permintaan barang dari lapangan | Pak Haryono |
| PR (Purchasing Request) | Permintaan pembelian, disusun dari UR dan hitungan stock gudang | Pak Nurdin |
| PO (Purchase Order) | Surat pesanan ke vendor: PDF bertanda tangan, berversi, daftar barang dan jumlah | Pak Andi |
| Surat Jalan | Dokumen pengiriman dari vendor | Vendor |
| Penerimaan | Catatan jumlah barang yang benar-benar diterima di kapal | Pak Haryono |
| Penerimaan Terverifikasi | Penerimaan yang sudah dicocokkan dengan surat jalan dan PO | Pak Nurdin |
| Invoice | Tagihan dari vendor, diinput ke sistem | Vendor (diinput Pak Fauzan) |
| T dan H-n | T = tanggal barang diminta tiba di kapal; H-n = n hari kalender sebelum T | - |

## Alur proses

Sepuluh tahap dari catatan harian sampai pembayaran.

| # | Tahap | Pelaku | Aktivitas | Hasil |
|---|---|---|---|---|
| 1 | Harian | Pak Haryono | Catat stock keluar, lihat saldo stock | Saldo stock terkini |
| 2 | Permintaan | Pak Haryono | Koreksi draft UR otomatis, kirim ke Pak Nurdin | UR |
| 3 | PR | Pak Nurdin | Evaluasi UR, hitung stock gudang terhadap batas minimum dan maksimum, buat PR | PR |
| 4 | PO | Pak Andi | Validasi PR, hitung kebutuhan 2 minggu dengan formula sendiri, buat PO, tanda tangan, PDF dikunci | PO bertanda tangan (v1) |
| 5 | Approval | Pak Fauzan atau Raihan | Setujui atau tolak. Ditolak: Pak Andi merevisi, sistem membuat versi baru, tanda tangan ulang | PO final |
| 6 | Kirim PO | Pak Andi | Kirim PDF final ke vendor, tandai terkirim di sistem | PO terkirim |
| 7 | Penerimaan | Pak Haryono | Terima barang dan surat jalan, cek fisik, input jumlah aktual, unggah foto surat jalan | Penerimaan |
| 8 | Verifikasi | Pak Nurdin | Cocokkan dengan surat jalan dan PO. Sesuai: terbitkan Penerimaan Terverifikasi. Tidak sesuai: Pak Andi memutuskan penyelesaian | Penerimaan Terverifikasi |
| 9 | Invoice | Pak Fauzan | Terima invoice dari vendor, input ke sistem; sistem membandingkan PO, surat jalan, penerimaan terverifikasi, dan invoice | Hasil perbandingan |
| 10 | Pembayaran | Pak Fauzan | Valid: siapkan dan bayar, catat status. Tidak valid: tahan pembayaran, klarifikasi ke vendor | Status bayar |

## Jadwal siklus

Satu siklus membeli stock untuk 2 minggu. Vendor meminta pemesanan sekitar 1 minggu sebelumnya, jadi PO untuk siklus berikutnya dibuat di minggu ke-2 siklus yang sedang berjalan, dan barang tiba pada T, yaitu awal siklus berikutnya. PO ditargetkan selesai disetujui pada H-7 dan wajib sudah sampai ke vendor paling lambat H-5. Tenggat tahap sebelumnya adalah contoh yang belum disepakati.

Konsekuensinya, saat PO dibuat stock siklus berjalan masih terpakai. Jumlah pesanan dihitung dari kebutuhan 2 minggu siklus berikutnya dikurangi proyeksi sisa stock saat barang tiba (saldo saat ini dikurangi pemakaian sampai T), dan setiap UR serta PR mencantumkan tanggal saldo yang dipakai. Ini usulan turunan dari aturan di atas dan perlu dikonfirmasi.

| Tahap | Pelaku | Tenggat | Status |
|---|---|---|---|
| UR | Pak Haryono | H-10 | Contoh |
| PR | Pak Nurdin | H-9 | Contoh |
| PO disusun dan ditandatangani | Pak Andi | H-8 | Contoh |
| Approval | Pak Fauzan atau Raihan | H-7 | Target internal, disepakati |
| PO terkirim ke vendor | Pak Andi | H-5 | Batas mutlak, syarat vendor |

H dihitung dalam hari kalender dari tanggal barang diminta tiba di kapal (T). Sistem menghitung tenggat otomatis dari T, mengirim pengingat per tahap, dan menandai tahap yang terlambat serta memberi tahu atasannya.

## Aturan bisnis

Aturan berikut sudah disepakati dan menjadi dasar fitur.

1. Pak Haryono wajib mencatat stock keluar setiap hari.
2. Setiap siklus membeli stock untuk 2 minggu, dipesan sekitar 1 minggu sebelum barang dibutuhkan atas permintaan vendor.
3. Hanya Pak Andi yang membuat PO. Jumlah di PO boleh berbeda dari PR; Pak Andi mengisi alasannya, dan sistem menyimpan jumlah PR dan PO berdampingan.
4. Pak Andi menandatangani PO sebelum dikirim ke Pak Fauzan untuk approval. Setelah ditandatangani, PDF dikunci. Jika ditolak, sistem membuat versi baru yang harus ditandatangani ulang.
5. PO baru boleh dikirim ke vendor setelah disetujui Pak Fauzan, atau Raihan sebagai delegasi.
6. PO dikirim ke vendor di luar sistem; Pak Andi menandainya sebagai terkirim di sistem.
7. Barang diterima Pak Haryono. Angka penerimaannya adalah catatan fisik dan tidak diubah siapa pun; koreksi lewat penyesuaian dengan alasan.
8. Pak Nurdin memverifikasi penerimaan terhadap surat jalan dan PO. Selisih diputuskan Pak Andi.
9. Invoice dikirim vendor langsung ke Pak Fauzan dan harus sama persis dengan barang yang diterima dan dengan PO.
10. Pembayaran dilakukan setelah barang diterima dan invoice valid.
11. Setiap perubahan penting dicatat di audit log: siapa, kapan, nilai sebelum dan sesudah.

## Status dokumen

Setiap dokumen punya status, nomor otomatis, dan riwayat perubahan.

| Dokumen | Alur status | Yang mengubah status |
|---|---|---|
| UR | Draft, Dikirim, Dievaluasi | Pak Haryono kirim; Pak Nurdin evaluasi |
| PR | Draft, Diajukan, Divalidasi | Pak Nurdin ajukan; Pak Andi validasi |
| PO | Draft, Ditandatangani, Menunggu approval, Disetujui atau Ditolak, Terkirim ke vendor | Pak Andi tanda tangan dan tandai terkirim; Pak Fauzan setujui atau tolak. Ditolak: versi baru, kembali ke Draft |
| Penerimaan | Dicatat, Terverifikasi atau Selisih, Selisih diputuskan | Pak Haryono catat; Pak Nurdin verifikasi; Pak Andi putuskan selisih |
| Invoice | Diterima, Dibandingkan, Valid atau Selisih, Dibayar atau Ditahan | Pak Fauzan input dan bayar; sistem membandingkan |

## Teknologi dan keamanan

Sistem dibuat sebagai aplikasi web: React SPA, API terpisah, dan PostgreSQL. Alasannya, ini aplikasi internal di balik login tanpa kebutuhan SEO, wifi kapal stabil, dan tidak ada kebutuhan perangkat keras khusus.

| Lapisan | Pilihan |
|---|---|
| Frontend | React + TypeScript + Vite (SPA), Tailwind + shadcn/ui, TanStack Query, Zod |
| Backend | Node.js 24 LTS + NestJS (adapter Fastify), REST + OpenAPI |
| Database | PostgreSQL 18 |
| ORM dan migrasi | Prisma atau Drizzle |
| Job terjadwal | pg-boss (pengingat dan tenggat) |
| File | Bucket S3-compatible privat, URL bertanda tangan berumur pendek |
| PDF dan Excel | pdf-lib atau PDFKit; ExcelJS |
| Notifikasi | Email transaksional dan notifikasi dalam aplikasi |
| Observability | Sentry dan log terstruktur |
| CI/CD | GitHub Actions, Dependabot, npm audit, CodeQL atau Semgrep |
| Hosting | Cloud atau PaaS dengan PostgreSQL terkelola dan point-in-time recovery; Cloudflare di depan |

**Kontrol keamanan utama:**
- Tanpa registrasi mandiri. Password Argon2id. TOTP wajib untuk Pak Fauzan, Pak Andi, dan akun delegasi.
- Sesi memakai cookie HttpOnly, Secure, SameSite, dengan batas waktu diam dan pembatasan percobaan login. Approval dan pembayaran meminta verifikasi MFA ulang.
- Otorisasi dicek di server pada setiap endpoint (bawaan: tolak). Penandatangan PO bukan yang menyetujui, dan akun admin tidak bisa meng-approve.
- Stock disimpan sebagai catatan pergerakan, audit log hanya bisa ditambah, dan hash SHA-256 PDF PO final disimpan untuk mendeteksi perubahan.
- Input divalidasi, query terparameter, CSP dan CORS ketat, proteksi CSRF. Unggahan divalidasi isinya, dan sel Excel di-escape terhadap formula injection.
- TLS, rahasia di secret manager, database tidak terbuka ke internet, backup terenkripsi dengan uji restore tiap kuartal.
- Patch bulanan untuk Node.js, PostgreSQL, dan dependensi. Sebelum rilis: checklist OWASP ASVS, dan pertimbangkan uji penetrasi pihak ketiga.

Per 12 Oktober 2026, Node.js 24 berstatus LTS sedangkan Node.js 26 masih Current, dan PostgreSQL 18 versi minor terbarunya 18.6 dengan dukungan sampai 14 November 2030. Versi dicek ulang saat pengembangan dimulai. (Sumber di dokumen asli: Node.js Releases, PostgreSQL Versioning Policy.)

## Keputusan terbuka

Delapan hal belum diputuskan; kolom usulan hanya titik awal diskusi, bukan keputusan. Versi kerja dengan perlakuan di kode ada di `docs/open-decisions.md`.

| Keputusan | Pemilik | Usulan sementara |
|---|---|---|
| Toleransi selisih (nominal, kualitas, kuantitas) | Raihan dan Pak Fauzan | Bawaan harus sama persis; Pak Fauzan boleh menyetujui selisih dengan alasan tercatat |
| Pembayaran bila vendor mengirim sebagian | Pak Fauzan | Belum ada usulan; pilihan: bayar sesuai yang diterima atau tahan sampai lengkap |
| Pengganti Pak Andi | Pak Fauzan dan Pak Andi | Belum dibahas; tanpa pengganti, PO tertahan saat Pak Andi berhalangan |
| Tenggat UR, PR, dan penyusunan PO (H-10, H-9, H-8) | Pak Fauzan, Pak Andi, Pak Nurdin, Pak Haryono | Angka contoh perlu diganti dengan yang disepakati |
| Aturan bahan vs barang (siklus, kedaluwarsa, batas min dan maks) | Raihan dan Pak Fauzan | Atribut diatur per item, bukan di kode |
| Termin pembayaran | Pak Fauzan | Di luar sistem; sistem hanya mencatat status |
| Formula perhitungan kebutuhan 2 minggu | Pak Andi | Tidak diotomatiskan dulu; sistem menyimpan jumlah dan alasan |
| Library autentikasi dan penyedia hosting | Raihan | Diputuskan saat implementasi; kandidat library: BetterAuth |

## Risiko dan asumsi

**Risiko yang diketahui:**
- Pak Andi tanpa pengganti: PO tertahan jika beliau berhalangan.
- Pak Nurdin menyusun PR sekaligus memverifikasi penerimaan, sehingga kontrol independen ada di Pak Fauzan saat mencocokkan invoice.
- Raihan sebagai admin sekaligus delegasi approval menimbulkan konflik kontrol bila memakai satu akun; karena itu dua akun terpisah.
- Wifi kapal bisa tersendat: form penerimaan tersimpan otomatis sebagai draft dan sistem menampilkan waktu sinkron terakhir.
- Gambar tanda tangan di PDF cukup untuk kontrol internal, tetapi bukan tanda tangan elektronik tersertifikasi; kekuatan hukumnya perlu dicek ke ahli hukum.

**Asumsi yang dipakai:**
- H dihitung dalam hari kalender, bukan hari kerja.
- Pak Haryono mengunggah foto surat jalan ke sistem.
- Vendor mengirim invoice setelah mengirim barang, tanpa menunggu verifikasi; pembayaran tetap hanya dibuka bila perbandingan dokumen valid.
- Satu gudang di kapal, jadi tidak ada transfer stock antar lokasi.
- Wifi kapal stabil, jadi tidak ada mode offline.

## Riwayat perubahan

| Tanggal | Perubahan |
|---|---|
| 12 Okt 2026 | Siklus diperjelas: stock 2 minggu dipesan sekitar 1 minggu sebelumnya atas permintaan vendor, PO dibuat di minggu ke-2 siklus berjalan |
| 12 Okt 2026 | Versi pertama dokumen kebutuhan; platform web dipilih (React SPA, NestJS, PostgreSQL 18) |
| 1 Okt 2026 | Activity diagram v2: penerimaan oleh Pak Haryono, verifikasi Pak Nurdin, tanda tangan sebelum approval, perbandingan 4 dokumen |
