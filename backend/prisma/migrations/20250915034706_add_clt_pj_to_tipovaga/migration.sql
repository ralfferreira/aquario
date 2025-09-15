/*
  Warnings:

  - Made the column `centroId` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."TipoVaga" ADD VALUE 'CLT';
ALTER TYPE "public"."TipoVaga" ADD VALUE 'PJ';

-- DropForeignKey
ALTER TABLE "public"."Usuario" DROP CONSTRAINT "Usuario_centroId_fkey";

-- AlterTable
ALTER TABLE "public"."Usuario" ALTER COLUMN "centroId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
