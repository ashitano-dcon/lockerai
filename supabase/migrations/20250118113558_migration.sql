CREATE TYPE "public"."UserRole" AS ENUM('USER', 'OCCUPIER');

ALTER TABLE "public"."users"
ADD COLUMN "role" "UserRole" NOT NULL DEFAULT 'USER'::"UserRole";