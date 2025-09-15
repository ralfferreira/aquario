-- CreateEnum
CREATE TYPE "public"."PapelMembroProjeto" AS ENUM ('ADMIN', 'MEMBRO');

-- CreateTable
CREATE TABLE "public"."MembroProjeto" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "projetoId" TEXT NOT NULL,
    "papel" "public"."PapelMembroProjeto" NOT NULL,

    CONSTRAINT "MembroProjeto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembroProjeto_usuarioId_projetoId_key" ON "public"."MembroProjeto"("usuarioId", "projetoId");

-- AddForeignKey
ALTER TABLE "public"."MembroProjeto" ADD CONSTRAINT "MembroProjeto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MembroProjeto" ADD CONSTRAINT "MembroProjeto_projetoId_fkey" FOREIGN KEY ("projetoId") REFERENCES "public"."Projeto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
