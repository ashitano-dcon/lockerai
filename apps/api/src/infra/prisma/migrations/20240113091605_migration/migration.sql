-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector"
WITH
  SCHEMA "public";

-- CreateEnum
CREATE TYPE "LostAndFoundState" AS ENUM('NONE', 'DELIVERING', 'RETRIEVING');

-- CreateTable
CREATE TABLE
  "users" (
    "id" UUID NOT NULL,
    "auth_id" UUID NOT NULL,
    "hashed_fingerprint" CHAR(64),
    "name" VARCHAR(64) NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "lost_and_found_state" "LostAndFoundState" NOT NULL DEFAULT 'NONE',
    "avatar_url" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "lost_items" (
    "id" UUID NOT NULL,
    "embedded_description" vector NOT NULL,
    "image_urls" TEXT[],
    "drawer_id" INTEGER NOT NULL,
    "reporterId" UUID NOT NULL,
    "ownerId" UUID,
    "reported_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "delivered_at" TIMESTAMP,
    "retrieved_at" TIMESTAMP,
    CONSTRAINT "lost_items_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "drawers" (
    "id" SERIAL NOT NULL,
    "locker_id" UUID NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "drawers_pkey" PRIMARY KEY ("id")
  );

-- CreateTable
CREATE TABLE
  "lockers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lockers_pkey" PRIMARY KEY ("id")
  );

-- CreateIndex
CREATE UNIQUE INDEX "users_auth_id_key" ON "users" ("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_hashed_fingerprint_key" ON "users" ("hashed_fingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "lost_items_drawer_id_key" ON "lost_items" ("drawer_id");

-- CreateIndex
CREATE UNIQUE INDEX "lost_items_reporterId_key" ON "lost_items" ("reporterId");

-- CreateIndex
CREATE UNIQUE INDEX "lost_items_ownerId_key" ON "lost_items" ("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "drawers_locker_id_key" ON "drawers" ("locker_id");

-- CreateIndex
CREATE UNIQUE INDEX "lockers_name_key" ON "lockers" ("name");

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_drawer_id_fkey" FOREIGN KEY ("drawer_id") REFERENCES "drawers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lost_items"
ADD CONSTRAINT "lost_items_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drawers"
ADD CONSTRAINT "drawers_locker_id_fkey" FOREIGN KEY ("locker_id") REFERENCES "lockers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
