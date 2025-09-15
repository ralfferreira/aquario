/*
  Warnings:

  - The values [ENCONTRADO] on the enum `StatusItemAchadoEPerdido` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."StatusItemAchadoEPerdido_new" AS ENUM ('DEVOLVIDO', 'PERDIDO');
ALTER TABLE "public"."ItemAchadoEPerdido" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."ItemAchadoEPerdido" ALTER COLUMN "status" TYPE "public"."StatusItemAchadoEPerdido_new" USING ("status"::text::"public"."StatusItemAchadoEPerdido_new");
ALTER TYPE "public"."StatusItemAchadoEPerdido" RENAME TO "StatusItemAchadoEPerdido_old";
ALTER TYPE "public"."StatusItemAchadoEPerdido_new" RENAME TO "StatusItemAchadoEPerdido";
DROP TYPE "public"."StatusItemAchadoEPerdido_old";
ALTER TABLE "public"."ItemAchadoEPerdido" ALTER COLUMN "status" SET DEFAULT 'PERDIDO';
COMMIT;

-- AlterTable
ALTER TABLE "public"."ItemAchadoEPerdido" ALTER COLUMN "status" SET DEFAULT 'PERDIDO';
