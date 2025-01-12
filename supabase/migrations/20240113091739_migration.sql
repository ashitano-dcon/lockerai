CREATE EXTENSION IF NOT EXISTS "vector"
WITH
  SCHEMA "public";

CREATE TYPE "public"."LostAndFoundState" AS ENUM('NONE', 'DELIVERING', 'RETRIEVING');

CREATE SEQUENCE "public"."drawers_id_seq";

CREATE TABLE
  "public"."drawers" (
    "id" INTEGER NOT NULL DEFAULT NEXTVAL('drawers_id_seq'::regclass),
    "locker_id" UUID NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "public"."lockers" (
    "id" UUID NOT NULL,
    "name" CHARACTER VARYING(32) NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  "public"."lost_items" (
    "id" UUID NOT NULL,
    "embedded_description" vector NOT NULL,
    "image_urls" TEXT[],
    "drawer_id" INTEGER NOT NULL,
    "reporterId" UUID NOT NULL,
    "ownerId" UUID,
    "reported_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_at" TIMESTAMP WITHOUT TIME ZONE,
    "retrieved_at" TIMESTAMP WITHOUT TIME ZONE
  );

CREATE TABLE
  "public"."users" (
    "id" UUID NOT NULL,
    "auth_id" UUID NOT NULL,
    "name" CHARACTER VARYING(64) NOT NULL,
    "email" CHARACTER VARYING(320) NOT NULL,
    "lost_and_found_state" "LostAndFoundState" NOT NULL DEFAULT 'NONE'::"LostAndFoundState",
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "hashed_fingerprint" CHARACTER(64)
  );

ALTER SEQUENCE "public"."drawers_id_seq" OWNED BY "public"."drawers"."id";

CREATE UNIQUE INDEX drawers_locker_id_key ON public.drawers USING btree (locker_id);

CREATE UNIQUE INDEX drawers_pkey ON public.drawers USING btree (id);

CREATE UNIQUE INDEX lockers_name_key ON public.lockers USING btree (NAME);

CREATE UNIQUE INDEX lockers_pkey ON public.lockers USING btree (id);

CREATE UNIQUE INDEX lost_items_drawer_id_key ON public.lost_items USING btree (drawer_id);

CREATE UNIQUE INDEX "lost_items_ownerId_key" ON public.lost_items USING btree ("ownerId");

CREATE UNIQUE INDEX lost_items_pkey ON public.lost_items USING btree (id);

CREATE UNIQUE INDEX "lost_items_reporterId_key" ON public.lost_items USING btree ("reporterId");

CREATE UNIQUE INDEX users_auth_id_key ON public.users USING btree (auth_id);

CREATE UNIQUE INDEX users_hashed_fingerprint_key ON public.users USING btree (hashed_fingerprint);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

ALTER TABLE "public"."drawers"
ADD CONSTRAINT "drawers_pkey" PRIMARY KEY USING INDEX "drawers_pkey";

ALTER TABLE "public"."lockers"
ADD CONSTRAINT "lockers_pkey" PRIMARY KEY USING INDEX "lockers_pkey";

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_pkey" PRIMARY KEY USING INDEX "lost_items_pkey";

ALTER TABLE "public"."users"
ADD CONSTRAINT "users_pkey" PRIMARY KEY USING INDEX "users_pkey";

ALTER TABLE "public"."drawers"
ADD CONSTRAINT "drawers_locker_id_fkey" FOREIGN KEY (locker_id) REFERENCES lockers (id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;

ALTER TABLE "public"."drawers" VALIDATE CONSTRAINT "drawers_locker_id_fkey";

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_drawer_id_fkey" FOREIGN KEY (drawer_id) REFERENCES drawers (id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_drawer_id_fkey";

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES users (id) ON UPDATE CASCADE ON DELETE SET NULL NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_ownerId_fkey";

ALTER TABLE "public"."lost_items"
ADD CONSTRAINT "lost_items_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES users (id) ON UPDATE CASCADE ON DELETE RESTRICT NOT VALID;

ALTER TABLE "public"."lost_items" VALIDATE CONSTRAINT "lost_items_reporterId_fkey";

GRANT DELETE ON TABLE "public"."drawers" TO "anon";

GRANT INSERT ON TABLE "public"."drawers" TO "anon";

GRANT REFERENCES ON TABLE "public"."drawers" TO "anon";

GRANT
SELECT
  ON TABLE "public"."drawers" TO "anon";

GRANT TRIGGER ON TABLE "public"."drawers" TO "anon";

GRANT
TRUNCATE ON TABLE "public"."drawers" TO "anon";

GRANT
UPDATE ON TABLE "public"."drawers" TO "anon";

GRANT DELETE ON TABLE "public"."drawers" TO "authenticated";

GRANT INSERT ON TABLE "public"."drawers" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."drawers" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."drawers" TO "authenticated";

GRANT TRIGGER ON TABLE "public"."drawers" TO "authenticated";

GRANT
TRUNCATE ON TABLE "public"."drawers" TO "authenticated";

GRANT
UPDATE ON TABLE "public"."drawers" TO "authenticated";

GRANT DELETE ON TABLE "public"."drawers" TO "service_role";

GRANT INSERT ON TABLE "public"."drawers" TO "service_role";

GRANT REFERENCES ON TABLE "public"."drawers" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."drawers" TO "service_role";

GRANT TRIGGER ON TABLE "public"."drawers" TO "service_role";

GRANT
TRUNCATE ON TABLE "public"."drawers" TO "service_role";

GRANT
UPDATE ON TABLE "public"."drawers" TO "service_role";

GRANT DELETE ON TABLE "public"."lockers" TO "anon";

GRANT INSERT ON TABLE "public"."lockers" TO "anon";

GRANT REFERENCES ON TABLE "public"."lockers" TO "anon";

GRANT
SELECT
  ON TABLE "public"."lockers" TO "anon";

GRANT TRIGGER ON TABLE "public"."lockers" TO "anon";

GRANT
TRUNCATE ON TABLE "public"."lockers" TO "anon";

GRANT
UPDATE ON TABLE "public"."lockers" TO "anon";

GRANT DELETE ON TABLE "public"."lockers" TO "authenticated";

GRANT INSERT ON TABLE "public"."lockers" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."lockers" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."lockers" TO "authenticated";

GRANT TRIGGER ON TABLE "public"."lockers" TO "authenticated";

GRANT
TRUNCATE ON TABLE "public"."lockers" TO "authenticated";

GRANT
UPDATE ON TABLE "public"."lockers" TO "authenticated";

GRANT DELETE ON TABLE "public"."lockers" TO "service_role";

GRANT INSERT ON TABLE "public"."lockers" TO "service_role";

GRANT REFERENCES ON TABLE "public"."lockers" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."lockers" TO "service_role";

GRANT TRIGGER ON TABLE "public"."lockers" TO "service_role";

GRANT
TRUNCATE ON TABLE "public"."lockers" TO "service_role";

GRANT
UPDATE ON TABLE "public"."lockers" TO "service_role";

GRANT DELETE ON TABLE "public"."lost_items" TO "anon";

GRANT INSERT ON TABLE "public"."lost_items" TO "anon";

GRANT REFERENCES ON TABLE "public"."lost_items" TO "anon";

GRANT
SELECT
  ON TABLE "public"."lost_items" TO "anon";

GRANT TRIGGER ON TABLE "public"."lost_items" TO "anon";

GRANT
TRUNCATE ON TABLE "public"."lost_items" TO "anon";

GRANT
UPDATE ON TABLE "public"."lost_items" TO "anon";

GRANT DELETE ON TABLE "public"."lost_items" TO "authenticated";

GRANT INSERT ON TABLE "public"."lost_items" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."lost_items" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."lost_items" TO "authenticated";

GRANT TRIGGER ON TABLE "public"."lost_items" TO "authenticated";

GRANT
TRUNCATE ON TABLE "public"."lost_items" TO "authenticated";

GRANT
UPDATE ON TABLE "public"."lost_items" TO "authenticated";

GRANT DELETE ON TABLE "public"."lost_items" TO "service_role";

GRANT INSERT ON TABLE "public"."lost_items" TO "service_role";

GRANT REFERENCES ON TABLE "public"."lost_items" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."lost_items" TO "service_role";

GRANT TRIGGER ON TABLE "public"."lost_items" TO "service_role";

GRANT
TRUNCATE ON TABLE "public"."lost_items" TO "service_role";

GRANT
UPDATE ON TABLE "public"."lost_items" TO "service_role";

GRANT DELETE ON TABLE "public"."users" TO "anon";

GRANT INSERT ON TABLE "public"."users" TO "anon";

GRANT REFERENCES ON TABLE "public"."users" TO "anon";

GRANT
SELECT
  ON TABLE "public"."users" TO "anon";

GRANT TRIGGER ON TABLE "public"."users" TO "anon";

GRANT
TRUNCATE ON TABLE "public"."users" TO "anon";

GRANT
UPDATE ON TABLE "public"."users" TO "anon";

GRANT DELETE ON TABLE "public"."users" TO "authenticated";

GRANT INSERT ON TABLE "public"."users" TO "authenticated";

GRANT REFERENCES ON TABLE "public"."users" TO "authenticated";

GRANT
SELECT
  ON TABLE "public"."users" TO "authenticated";

GRANT TRIGGER ON TABLE "public"."users" TO "authenticated";

GRANT
TRUNCATE ON TABLE "public"."users" TO "authenticated";

GRANT
UPDATE ON TABLE "public"."users" TO "authenticated";

GRANT DELETE ON TABLE "public"."users" TO "service_role";

GRANT INSERT ON TABLE "public"."users" TO "service_role";

GRANT REFERENCES ON TABLE "public"."users" TO "service_role";

GRANT
SELECT
  ON TABLE "public"."users" TO "service_role";

GRANT TRIGGER ON TABLE "public"."users" TO "service_role";

GRANT
TRUNCATE ON TABLE "public"."users" TO "service_role";

GRANT
UPDATE ON TABLE "public"."users" TO "service_role";
