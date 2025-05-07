import { sql } from 'drizzle-orm';
import { doublePrecision, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const lockers = pgTable(
  'lockers',
  {
    id: uuid().primaryKey().notNull(),
    name: varchar({ length: 32 }).notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    lat: doublePrecision().notNull(),
    lng: doublePrecision().notNull(),
    location: text().notNull(),
  },
  (table) => [uniqueIndex('lockers_name_key').using('btree', table.name.asc().nullsLast().op('text_ops'))],
);
