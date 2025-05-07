import { sql } from 'drizzle-orm';
import { boolean, char, pgTable, text, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { lostAndFoundState, userRole } from './_common';

export const users = pgTable(
  'users',
  {
    id: uuid().primaryKey().notNull().defaultRandom(),
    authId: uuid('auth_id').notNull(),
    name: varchar({ length: 64 }).notNull(),
    email: varchar({ length: 320 }).notNull(),
    lostAndFoundState: lostAndFoundState('lost_and_found_state').default('NONE').notNull(),
    avatarUrl: text('avatar_url').notNull(),
    createdAt: timestamp('created_at', { mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    hashedFingerprintId: char('hashed_fingerprint_id', { length: 64 }),
    isDiscloseAsOwner: boolean('is_disclose_as_owner').default(true).notNull(),
    role: userRole().default('USER').notNull(),
  },
  (table) => [
    uniqueIndex('users_auth_id_key').using('btree', table.authId.asc().nullsLast().op('uuid_ops')),
    uniqueIndex('users_hashed_fingerprint_id_key').using('btree', table.hashedFingerprintId.asc().nullsLast().op('bpchar_ops')),
  ],
);
