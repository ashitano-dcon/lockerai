/*
Warnings:

- You are about to drop the column `hashed_fingerprint` on the `users` table. All the data in the column will be lost.
- A unique constraint covering the columns `[hashed_fingerprint_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

 */
-- DropIndex
DROP INDEX "users_hashed_fingerprint_key";

-- AlterTable
ALTER TABLE "users"
DROP COLUMN "hashed_fingerprint",
ADD COLUMN "hashed_fingerprint_id" CHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX "users_hashed_fingerprint_id_key" ON "users" ("hashed_fingerprint_id");
