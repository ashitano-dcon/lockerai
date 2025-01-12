REVOKE DELETE ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE INSERT ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE REFERENCES ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE
SELECT
  ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE TRIGGER ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE
TRUNCATE ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE
UPDATE ON TABLE "public"."drawers"
FROM
  "anon";

REVOKE DELETE ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE INSERT ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE REFERENCES ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE
SELECT
  ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE TRIGGER ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE
TRUNCATE ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE
UPDATE ON TABLE "public"."drawers"
FROM
  "authenticated";

REVOKE DELETE ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE INSERT ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE REFERENCES ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE
SELECT
  ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE TRIGGER ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE
TRUNCATE ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE
UPDATE ON TABLE "public"."drawers"
FROM
  "service_role";

REVOKE DELETE ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE INSERT ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE REFERENCES ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE
SELECT
  ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE TRIGGER ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE
TRUNCATE ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE
UPDATE ON TABLE "public"."lockers"
FROM
  "anon";

REVOKE DELETE ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE INSERT ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE REFERENCES ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE
SELECT
  ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE TRIGGER ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE
TRUNCATE ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE
UPDATE ON TABLE "public"."lockers"
FROM
  "authenticated";

REVOKE DELETE ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE INSERT ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE REFERENCES ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE
SELECT
  ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE TRIGGER ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE
TRUNCATE ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE
UPDATE ON TABLE "public"."lockers"
FROM
  "service_role";

REVOKE DELETE ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE INSERT ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE REFERENCES ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE
SELECT
  ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE TRIGGER ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE
TRUNCATE ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE
UPDATE ON TABLE "public"."lost_items"
FROM
  "anon";

REVOKE DELETE ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE INSERT ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE REFERENCES ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE
SELECT
  ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE TRIGGER ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE
TRUNCATE ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE
UPDATE ON TABLE "public"."lost_items"
FROM
  "authenticated";

REVOKE DELETE ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE INSERT ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE REFERENCES ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE
SELECT
  ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE TRIGGER ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE
TRUNCATE ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE
UPDATE ON TABLE "public"."lost_items"
FROM
  "service_role";

REVOKE DELETE ON TABLE "public"."users"
FROM
  "anon";

REVOKE INSERT ON TABLE "public"."users"
FROM
  "anon";

REVOKE REFERENCES ON TABLE "public"."users"
FROM
  "anon";

REVOKE
SELECT
  ON TABLE "public"."users"
FROM
  "anon";

REVOKE TRIGGER ON TABLE "public"."users"
FROM
  "anon";

REVOKE
TRUNCATE ON TABLE "public"."users"
FROM
  "anon";

REVOKE
UPDATE ON TABLE "public"."users"
FROM
  "anon";

REVOKE DELETE ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE INSERT ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE REFERENCES ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE
SELECT
  ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE TRIGGER ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE
TRUNCATE ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE
UPDATE ON TABLE "public"."users"
FROM
  "authenticated";

REVOKE DELETE ON TABLE "public"."users"
FROM
  "service_role";

REVOKE INSERT ON TABLE "public"."users"
FROM
  "service_role";

REVOKE REFERENCES ON TABLE "public"."users"
FROM
  "service_role";

REVOKE
SELECT
  ON TABLE "public"."users"
FROM
  "service_role";

REVOKE TRIGGER ON TABLE "public"."users"
FROM
  "service_role";

REVOKE
TRUNCATE ON TABLE "public"."users"
FROM
  "service_role";

REVOKE
UPDATE ON TABLE "public"."users"
FROM
  "service_role";

CREATE TABLE
  "public"."_prisma_migrations" (
    "id" CHARACTER VARYING(36) NOT NULL,
    "checksum" CHARACTER VARYING(64) NOT NULL,
    "finished_at" TIMESTAMP WITH TIME ZONE,
    "migration_name" CHARACTER VARYING(255) NOT NULL,
    "logs" TEXT,
    "rolled_back_at" TIMESTAMP WITH TIME ZONE,
    "started_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "applied_steps_count" INTEGER NOT NULL DEFAULT 0
  );

CREATE UNIQUE INDEX _prisma_migrations_pkey ON public._prisma_migrations USING btree (id);

ALTER TABLE "public"."_prisma_migrations"
ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY USING INDEX "_prisma_migrations_pkey";
