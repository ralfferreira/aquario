/*
  Warnings:

  - You are about to drop the `AchadosEPerdidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."StatusItemAchadoEPerdido" AS ENUM ('ENCONTRADO', 'PERDIDO', 'DEVOLVIDO');

-- DropForeignKey
ALTER TABLE "public"."AchadosEPerdidos" DROP CONSTRAINT "AchadosEPerdidos_reportadoPorId_fkey";

-- DropTable
DROP TABLE "public"."AchadosEPerdidos";

-- DropEnum
DROP TYPE "public"."StatusAchadosEPerdidos";

-- CreateTable
CREATE TABLE "public"."ItemAchadoEPerdido" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "public"."StatusItemAchadoEPerdido" NOT NULL DEFAULT 'ENCONTRADO',
    "autorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemAchadoEPerdido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ItemAchadoEPerdido" ADD CONSTRAINT "ItemAchadoEPerdido_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
