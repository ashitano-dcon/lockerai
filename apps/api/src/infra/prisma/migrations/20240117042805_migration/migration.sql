/*
Warnings:

- You are about to drop the column `ownerId` on the `lost_items` table. All the data in the column will be lost.
- You are about to drop the column `reporterId` on the `lost_items` table. All the data in the column will be lost.
- A unique constraint covering the columns `[reporter_id]` on the table `lost_items` will be added. If there are existing duplicate values, this will fail.
- A unique constraint covering the columns `[owner_id]` on the table `lost_items` will be added. If there are existing duplicate values, this will fail.
- Added the required column `reporter_id` to the `lost_items` table without a default value. This is not possible if the table is not empty.

 */
-- DropForeignKey
ALTER TABLE "lost_items"
DROP CONSTRAINT "lost_items_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "lost_items"
DROP CONSTRAINT "lost_items_reporterId_fkey";

-- DropIndex
DROP INDEX "lost_items_ownerId_key";

-- DropIndex
DROP INDEX "lost_items_reporterId_key";

-- AlterTable
ALTER TABLE "lost_items"
DROP COLUMN "ownerId",
DROP COLUMN "reporterId",
ADD COLUMN "owner_id" UUID,
ADD COLUMN "reporter_id" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lost_items_reporter_id_key" ON "lost_items" ("reporter_id");

-- CreateIndex
CREATE UNIQUE INDEX "lost_items_owner_id_key" ON "lost_items" ("owner_id");

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
