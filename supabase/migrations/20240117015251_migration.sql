DROP INDEX IF EXISTS "public"."users_hashed_fingerprint_key";

ALTER TABLE "public"."users"
DROP COLUMN "hashed_fingerprint";

ALTER TABLE "public"."users"
ADD COLUMN "hashed_fingerprint_id" CHARACTER(64);

CREATE UNIQUE INDEX users_hashed_fingerprint_id_key ON public.users USING btree (hashed_fingerprint_id);
