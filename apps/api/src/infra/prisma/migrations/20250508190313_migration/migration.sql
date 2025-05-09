/*
  Warnings:

  - Added the required column `location_i18n` to the `lockers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_i18n` to the `lockers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_i18n` to the `lost_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title_i18n` to the `lost_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lockers" ADD COLUMN     "location_i18n" JSONB NOT NULL,
ADD COLUMN     "name_i18n" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "lost_items" ADD COLUMN     "description_i18n" JSONB NOT NULL,
ADD COLUMN     "title_i18n" JSONB NOT NULL;
