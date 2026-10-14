# RPM Stock Management

Sistem stock, permintaan (UR/PR), PO, penerimaan barang, dan pencocokan invoice untuk katering kapal pesiar PT Rassana Persada Makmur. Acuan kebutuhan: *Dokumen Kebutuhan - Stock Management Catering Kapal* (12 Okt 2026).

## Tech stack (MVP)

| Lapisan | Pilihan | Catatan |
|---|---|---|
| Frontend | React 19 + TypeScript + Vite 8, Tailwind 4, TanStack Query, Zod | shadcn/ui ditambahkan saat mulai membangun UI |
| Backend | Node.js 24 LTS + NestJS 12 (adapter Fastify), REST + OpenAPI | NestJS 12 hanya mendukung ESM |
| Database | PostgreSQL 18 | via Docker untuk development |
| ORM / migrasi | Drizzle ORM + drizzle-kit | dipilih karena Prisma `latest` saat ini masih rilis RC |
| CI | GitHub Actions | typecheck, build, npm audit |

## Struktur

```
apps/
  api/   NestJS: src/db/schema.ts (skema), src/health (cek koneksi), drizzle/ (migrasi)
  web/   React SPA
docker-compose.yml   PostgreSQL 18 lokal
```

## Menjalankan di lokal

Prasyarat: Node.js 24 (`nvm use`), Docker Desktop, Git.

```bash
npm install
cp .env.example .env        # Windows CMD: copy .env.example .env
npm run db:up               # jalankan PostgreSQL
npm run db:migrate          # terapkan migrasi
npm run dev:api             # terminal 1: API di http://localhost:3000/api
npm run dev:web             # terminal 2: web di http://localhost:5173
```

- Dokumentasi API (Swagger): http://localhost:3000/api/docs
- Cek koneksi: http://localhost:3000/api/health

## Skema database awal

`users`, `items`, `stock_movements`, `audit_log`, `document_counters`. Prinsipnya: stock berupa catatan pergerakan (saldo = jumlah pergerakan), audit log hanya ditambah, koreksi lewat baris penyesuaian dengan alasan. Tabel PO, penerimaan, dan invoice ditambahkan per fase.

## Yang belum dikerjakan

Autentikasi (library belum diputuskan; kandidat Better Auth), peran dan otorisasi, MFA, seluruh alur UR/PR/PO/penerimaan/invoice, upload file, notifikasi, dan job terjadwal (pg-boss).
