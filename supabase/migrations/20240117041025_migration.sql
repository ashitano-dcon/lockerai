ALTER TABLE "public"."lost_items"
DROP CONSTRAINT "lost_items_drawer_id_fkey";

ALTER TABLE "public"."lost_items"
ALTER COLUMN "drawer_id"
DROP NOT NULL;

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_drawer_id_fkey" FOREIGN KEY (drawer_id) REFERENCES drawers (id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_drawer_id_fkey";
