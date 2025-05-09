-- AlterTable
ALTER TABLE "lockers" ALTER COLUMN "location_i18n" SET DEFAULT '{"en":null,"ja":null}',
ALTER COLUMN "name_i18n" SET DEFAULT '{"en":null,"ja":null}';

-- AlterTable
ALTER TABLE "lost_items" ALTER COLUMN "description_i18n" SET DEFAULT '{"en":null,"ja":null}',
ALTER COLUMN "title_i18n" SET DEFAULT '{"en":null,"ja":null}';
