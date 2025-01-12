-- DropForeignKey
ALTER TABLE "lost_items"
DROP CONSTRAINT "lost_items_drawer_id_fkey";

-- AlterTable
ALTER TABLE "lost_items"
ALTER COLUMN "drawer_id"
DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_drawer_id_fkey" FOREIGN KEY ("drawer_id") REFERENCES "drawers" ("id") ON DELETE SET NULL ON UPDATE CASCADE;
