-- CreateEnum
CREATE TYPE "public"."StatusGuia" AS ENUM ('ATIVO', 'INATIVO', 'RASCUNHO');

-- CreateTable
CREATE TABLE "public"."Guia" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "status" "public"."StatusGuia" NOT NULL DEFAULT 'RASCUNHO',
    "cursoId" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Guia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SecaoGuia" (
    "id" TEXT NOT NULL,
    "guiaId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "conteudo" TEXT,
    "status" "public"."StatusGuia" NOT NULL DEFAULT 'RASCUNHO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecaoGuia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SubSecaoGuia" (
    "id" TEXT NOT NULL,
    "secaoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "conteudo" TEXT,
    "status" "public"."StatusGuia" NOT NULL DEFAULT 'RASCUNHO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubSecaoGuia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guia_slug_key" ON "public"."Guia"("slug");

-- CreateIndex
CREATE INDEX "Guia_cursoId_idx" ON "public"."Guia"("cursoId");

-- CreateIndex
CREATE INDEX "Guia_slug_idx" ON "public"."Guia"("slug");

-- CreateIndex
CREATE INDEX "Guia_status_idx" ON "public"."Guia"("status");

-- CreateIndex
CREATE INDEX "Guia_criadoEm_idx" ON "public"."Guia"("criadoEm");

-- CreateIndex
CREATE INDEX "SecaoGuia_guiaId_idx" ON "public"."SecaoGuia"("guiaId");

-- CreateIndex
CREATE INDEX "SecaoGuia_ordem_idx" ON "public"."SecaoGuia"("ordem");

-- CreateIndex
CREATE INDEX "SecaoGuia_status_idx" ON "public"."SecaoGuia"("status");

-- CreateIndex
CREATE INDEX "SubSecaoGuia_secaoId_idx" ON "public"."SubSecaoGuia"("secaoId");

-- CreateIndex
CREATE INDEX "SubSecaoGuia_ordem_idx" ON "public"."SubSecaoGuia"("ordem");

-- CreateIndex
CREATE INDEX "SubSecaoGuia_status_idx" ON "public"."SubSecaoGuia"("status");

-- AddForeignKey
ALTER TABLE "public"."Guia" ADD CONSTRAINT "Guia_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SecaoGuia" ADD CONSTRAINT "SecaoGuia_guiaId_fkey" FOREIGN KEY ("guiaId") REFERENCES "public"."Guia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SubSecaoGuia" ADD CONSTRAINT "SubSecaoGuia_secaoId_fkey" FOREIGN KEY ("secaoId") REFERENCES "public"."SecaoGuia"("id") ON DELETE CASCADE ON UPDATE CASCADE;
