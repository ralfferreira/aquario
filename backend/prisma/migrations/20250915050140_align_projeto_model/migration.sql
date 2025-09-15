/*
  Warnings:

  - You are about to drop the column `donoId` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `tecnologias` on the `Projeto` table. All the data in the column will be lost.
  - You are about to drop the column `urlRepositorio` on the `Projeto` table. All the data in the column will be lost.
  - Added the required column `criadorId` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Projeto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Projeto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Projeto" DROP CONSTRAINT "Projeto_donoId_fkey";

-- AlterTable
ALTER TABLE "public"."Projeto" DROP COLUMN "donoId",
DROP COLUMN "nome",
DROP COLUMN "tecnologias",
DROP COLUMN "urlRepositorio",
ADD COLUMN     "criadorId" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "tipo" "public"."TipoProjeto" NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "urlFoto" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Projeto" ADD CONSTRAINT "Projeto_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
