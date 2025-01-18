/*
  Warnings:

  - Made the column `lat` on table `lockers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lng` on table `lockers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `lockers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "lockers" ALTER COLUMN "lat" SET NOT NULL,
ALTER COLUMN "lng" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;
