/*
  Warnings:

  - A unique constraint covering the columns `[matricula]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "matricula" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_matricula_key" ON "public"."Usuario"("matricula");
