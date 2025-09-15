/*
  Warnings:

  - Changed the type of `papel` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PapelUsuario" AS ENUM ('DISCENTE', 'DOCENTE');

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "permissoes" TEXT[] DEFAULT ARRAY[]::TEXT[],
DROP COLUMN "papel",
ADD COLUMN     "papel" "public"."PapelUsuario" NOT NULL;

-- DropEnum
DROP TYPE "public"."Papel";
