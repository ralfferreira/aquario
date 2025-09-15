-- CreateEnum
CREATE TYPE "public"."Papel" AS ENUM ('DISCENTE', 'DOCENTE', 'ENTIDADE', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."TipoVaga" AS ENUM ('ESTAGIO', 'TRAINEE', 'VOLUNTARIO', 'PESQUISA');

-- CreateEnum
CREATE TYPE "public"."StatusAchadosEPerdidos" AS ENUM ('PERDIDO', 'ENCONTRADO');

-- CreateTable
CREATE TABLE "public"."Campus" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Campus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Centro" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "descricao" TEXT,
    "campusId" TEXT NOT NULL,

    CONSTRAINT "Centro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Curso" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "centroId" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "papel" "public"."Papel" NOT NULL DEFAULT 'DISCENTE',
    "eVerificado" BOOLEAN NOT NULL DEFAULT false,
    "bio" TEXT,
    "urlFotoPerfil" TEXT,
    "periodo" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "centroId" TEXT,
    "cursoId" TEXT,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Publicacao" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "centroId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publicacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Projeto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "donoId" TEXT NOT NULL,
    "centroId" TEXT NOT NULL,
    "tecnologias" TEXT[],
    "urlRepositorio" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Projeto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Vaga" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipoVaga" "public"."TipoVaga" NOT NULL,
    "publicadorId" TEXT NOT NULL,
    "centroId" TEXT NOT NULL,
    "eAtiva" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AchadosEPerdidos" (
    "id" TEXT NOT NULL,
    "nomeItem" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "public"."StatusAchadosEPerdidos" NOT NULL,
    "reportadoPorId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AchadosEPerdidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ItemFAQ" (
    "id" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "centroId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemFAQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campus_nome_key" ON "public"."Campus"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Centro_nome_key" ON "public"."Centro"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Centro_sigla_key" ON "public"."Centro"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_nome_key" ON "public"."Curso"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- AddForeignKey
ALTER TABLE "public"."Centro" ADD CONSTRAINT "Centro_campusId_fkey" FOREIGN KEY ("campusId") REFERENCES "public"."Campus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Curso" ADD CONSTRAINT "Curso_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "public"."Curso"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Publicacao" ADD CONSTRAINT "Publicacao_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Publicacao" ADD CONSTRAINT "Publicacao_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Projeto" ADD CONSTRAINT "Projeto_donoId_fkey" FOREIGN KEY ("donoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Projeto" ADD CONSTRAINT "Projeto_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_publicadorId_fkey" FOREIGN KEY ("publicadorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AchadosEPerdidos" ADD CONSTRAINT "AchadosEPerdidos_reportadoPorId_fkey" FOREIGN KEY ("reportadoPorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ItemFAQ" ADD CONSTRAINT "ItemFAQ_centroId_fkey" FOREIGN KEY ("centroId") REFERENCES "public"."Centro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
