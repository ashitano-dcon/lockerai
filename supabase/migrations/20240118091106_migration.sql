REVOKE DELETE ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE INSERT ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE REFERENCES ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE
SELECT
  ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE TRIGGER ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE
TRUNCATE ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE
UPDATE ON TABLE "public"."_prisma_migrations"
FROM
  "anon";

REVOKE DELETE ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE INSERT ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE REFERENCES ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE
SELECT
  ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE TRIGGER ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE
TRUNCATE ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE
UPDATE ON TABLE "public"."_prisma_migrations"
FROM
  "authenticated";

REVOKE DELETE ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE INSERT ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE REFERENCES ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE
SELECT
  ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE TRIGGER ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE
TRUNCATE ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

REVOKE
UPDATE ON TABLE "public"."_prisma_migrations"
FROM
  "service_role";

ALTER TABLE "public"."users"
ALTER COLUMN "hashed_fingerprint_id"
SET DATA TYPE TEXT USING "hashed_fingerprint_id"::TEXT;
