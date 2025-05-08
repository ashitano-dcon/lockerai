import { sql } from 'drizzle-orm';
import { foreignKey, integer, pgTable, text, timestamp, uniqueIndex, uuid, vector } from 'drizzle-orm/pg-core';
import { drawers } from './drawers';
import { users } from './users';

export const lostItems = pgTable(
  'lost_items',
  {
    id: uuid().primaryKey().notNull(),
    embeddedDescription: vector('embedded_description', { dimensions: 1536 }).notNull(),
    imageUrls: text('image_urls').array(),
    drawerId: integer('drawer_id'),
    reportedAt: timestamp('reported_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deliveredAt: timestamp('delivered_at', { mode: 'string' }),
    retrievedAt: timestamp('retrieved_at', { mode: 'string' }),
    ownerId: uuid('owner_id'),
    reporterId: uuid('reporter_id').notNull(),
    description: text().notNull(),
    title: text().notNull(),
    ownedAt: timestamp('owned_at', { mode: 'string' }),
  },
  (table) => [
    uniqueIndex('lost_items_drawer_id_key').using('btree', table.drawerId.asc().nullsLast().op('int4_ops')),
    foreignKey({
      columns: [table.drawerId],
      foreignColumns: [drawers.id],
      name: 'lost_items_drawer_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
    foreignKey({
      columns: [table.ownerId],
      foreignColumns: [users.id],
      name: 'lost_items_owner_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('set null'),
    foreignKey({
      columns: [table.reporterId],
      foreignColumns: [users.id],
      name: 'lost_items_reporter_id_fkey',
    })
      .onUpdate('cascade')
      .onDelete('restrict'),
  ],
);
