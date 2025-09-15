/*
  Warnings:

  - You are about to drop the `MembroProjeto` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."TipoEntidade" AS ENUM ('LABORATORIO', 'GRUPO_PESQUISA', 'LIGA_ACADEMICA', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."PapelMembro" AS ENUM ('ADMIN', 'MEMBRO');

-- DropForeignKey
ALTER TABLE "public"."MembroProjeto" DROP CONSTRAINT "MembroProjeto_projetoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MembroProjeto" DROP CONSTRAINT "MembroProjeto_usuarioId_fkey";

-- AlterTable
ALTER TABLE "public"."Projeto" ADD COLUMN     "entidadeId" TEXT;

-- AlterTable
ALTER TABLE "public"."Publicacao" ADD COLUMN     "entidadeId" TEXT;

-- AlterTable
ALTER TABLE "public"."Vaga" ADD COLUMN     "entidadeId" TEXT;

-- DropTable
DROP TABLE "public"."MembroProjeto";

-- DropEnum
DROP TYPE "public"."PapelMembroProjeto";

-- CreateTable
CREATE TABLE "public"."Entidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "tipo" "public"."TipoEntidade" NOT NULL,
    "urlFoto" TEXT,
    "contato" TEXT,
    "centroId" TEXT NOT NULL,
    "criadorId" TEXT NOT NULL,

    CONSTRAINT "Entidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MembroEntidade" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    "papel" "public"."PapelMembro" NOT NULL,

    CONSTRAINT "MembroEntidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entidade_nome_tipo_key" ON "public"."Entidade"("nome", "tipo");

-- CreateIndex
CREATE UNIQUE INDEX "MembroEntidade_usuarioId_entidadeId_key" ON "public"."MembroEntidade"("usuarioId", "entidadeId");

-- AddForeignKey
ALTER TABLE "public"."Publicacao" ADD CONSTRAINT "Publicacao_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Projeto" ADD CONSTRAINT "Projeto_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entidade" ADD CONSTRAINT "Entidade_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Entidade" ADD CONSTRAINT "Entidade_criadorId_fkey" FOREIGN KEY ("criadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembroEntidade" ADD CONSTRAINT "MembroEntidade_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembroEntidade" ADD CONSTRAINT "MembroEntidade_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
