import { pgEnum } from 'drizzle-orm/pg-core';

export const lostAndFoundState = pgEnum('LostAndFoundState', ['NONE', 'DELIVERING', 'RETRIEVING']);
export const userRole = pgEnum('UserRole', ['USER', 'OCCUPIER']);
