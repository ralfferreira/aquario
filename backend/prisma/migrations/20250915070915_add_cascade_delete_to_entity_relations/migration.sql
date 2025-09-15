-- DropForeignKey
ALTER TABLE "public"."Projeto" DROP CONSTRAINT "Projeto_entidadeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Publicacao" DROP CONSTRAINT "Publicacao_entidadeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Vaga" DROP CONSTRAINT "Vaga_entidadeId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Publicacao" ADD CONSTRAINT "Publicacao_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Projeto" ADD CONSTRAINT "Projeto_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vaga" ADD CONSTRAINT "Vaga_entidadeId_fkey" FOREIGN KEY ("entidadeId") REFERENCES "public"."Entidade"("id") ON DELETE CASCADE ON UPDATE CASCADE;
