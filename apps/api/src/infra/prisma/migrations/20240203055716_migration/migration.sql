/*
Warnings:

- You are about to alter the column `hashed_fingerprint_id` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Char(64)`.

 */
-- AlterTable
ALTER TABLE "users"
ALTER COLUMN "hashed_fingerprint_id"
SET DATA TYPE CHAR(64);