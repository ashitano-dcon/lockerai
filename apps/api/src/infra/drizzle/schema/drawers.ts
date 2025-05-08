import { sql } from 'drizzle-orm';
import { foreignKey, pgTable, serial, timestamp, uuid } from 'drizzle-orm/pg-core';
import { lockers } from './lockers';

export const drawers = pgTable(
  'drawers',
  {
    id: serial().primaryKey().notNull(),
    lockerId: uuid('locker_id').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.lockerId],
      foreignColumns: [lockers.id],
      name: 'drawers_locker_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);
