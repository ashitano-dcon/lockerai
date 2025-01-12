ALTER TABLE "public"."users"
ALTER COLUMN "hashed_fingerprint_id"
SET DATA TYPE CHARACTER(64) USING "hashed_fingerprint_id"::CHARACTER(64);