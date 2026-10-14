import {
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

/**
 * Skema awal MVP, diturunkan dari Dokumen Kebutuhan (12 Okt 2026).
 * Prinsip yang diterapkan:
 *  - Stock disimpan sebagai catatan pergerakan (stock_movements), bukan saldo yang ditimpa.
 *  - Audit log hanya boleh ditambah (append-only).
 *  - Angka penerimaan adalah catatan fisik; koreksi lewat baris penyesuaian dengan alasan.
 * Tabel PO, penerimaan, dan invoice sengaja belum dibuat: ditambahkan per fase MVP.
 */

export const userRole = pgEnum('user_role', [
  'owner', // Pak Fauzan: approver akhir, invoice, pembayaran
  'po_creator', // Pak Andi: pembuat PO
  'stock_controller', // Pak Nurdin: evaluasi UR, buat PR, verifikasi penerimaan
  'field_operator', // Pak Haryono: stok harian, UR, penerimaan
  'approval_delegate', // Raihan (akun delegasi)
  'admin', // Raihan (akun admin, tidak bisa approve)
]);

export const movementType = pgEnum('movement_type', [
  'receipt', // barang masuk dari vendor
  'consumption', // stock keluar harian
  'adjustment', // koreksi dengan alasan
]);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: userRole('role').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const items = pgTable('items', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  name: text('name').notNull(),
  unit: text('unit').notNull(),
  // Batas per item (bukan di kode), sesuai keputusan terbuka "aturan bahan vs barang".
  minStock: numeric('min_stock', { precision: 14, scale: 3 }),
  maxStock: numeric('max_stock', { precision: 14, scale: 3 }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const stockMovements = pgTable(
  'stock_movements',
  {
    id: serial('id').primaryKey(),
    itemId: uuid('item_id')
      .notNull()
      .references(() => items.id),
    type: movementType('type').notNull(),
    // Positif = masuk, negatif = keluar. Saldo = SUM(quantity) per item.
    quantity: numeric('quantity', { precision: 14, scale: 3 }).notNull(),
    occurredOn: timestamp('occurred_on', { withTimezone: true }).notNull(),
    reason: text('reason'), // wajib diisi untuk adjustment (divalidasi di lapisan aplikasi)
    createdBy: uuid('created_by')
      .notNull()
      .references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index('stock_movements_item_idx').on(t.itemId, t.occurredOn)],
);

export const auditLog = pgTable('audit_log', {
  id: serial('id').primaryKey(),
  actorId: uuid('actor_id').references(() => users.id),
  action: text('action').notNull(),
  entity: text('entity').notNull(),
  entityId: text('entity_id').notNull(),
  before: jsonb('before'),
  after: jsonb('after'),
  occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull().defaultNow(),
});

// Dipakai nanti untuk penomoran dokumen otomatis (UR/PR/PO).
export const documentCounters = pgTable('document_counters', {
  prefix: text('prefix').primaryKey(),
  year: integer('year').notNull(),
  lastNumber: integer('last_number').notNull().default(0),
});
