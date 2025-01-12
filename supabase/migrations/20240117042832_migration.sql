ALTER TABLE "public"."lost_items"
DROP CONSTRAINT "lost_items_ownerId_fkey";

ALTER TABLE "public"."lost_items"
DROP CONSTRAINT "lost_items_reporterId_fkey";

DROP INDEX IF EXISTS "public"."lost_items_ownerId_key";

DROP INDEX IF EXISTS "public"."lost_items_reporterId_key";

ALTER TABLE "public"."lost_items"
DROP COLUMN "ownerId";

ALTER TABLE "public"."lost_items"
DROP COLUMN "reporterId";

ALTER TABLE "public"."lost_items"
ADD COLUMN "owner_id" UUID;

ALTER TABLE "public"."lost_items"
ADD COLUMN "reporter_id" UUID NOT NULL;

CREATE UNIQUE INDEX lost_items_owner_id_key ON public.lost_items USING btree (owner_id);

CREATE UNIQUE INDEX lost_items_reporter_id_key ON public.lost_items USING btree (reporter_id);

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_owner_id_fkey";

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_reporter_id_fkey" FOREIGN KEY (reporter_id) REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_reporter_id_fkey";
