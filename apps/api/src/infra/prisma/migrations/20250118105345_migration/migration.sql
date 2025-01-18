-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'OCCUPIER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
