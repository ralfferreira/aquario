-- CreateIndex
CREATE INDEX "Projeto_criadorId_idx" ON "public"."Projeto"("criadorId");

-- CreateIndex
CREATE INDEX "Projeto_centroId_idx" ON "public"."Projeto"("centroId");

-- CreateIndex
CREATE INDEX "Projeto_entidadeId_idx" ON "public"."Projeto"("entidadeId");

-- CreateIndex
CREATE INDEX "Publicacao_autorId_idx" ON "public"."Publicacao"("autorId");

-- CreateIndex
CREATE INDEX "Publicacao_centroId_idx" ON "public"."Publicacao"("centroId");

-- CreateIndex
CREATE INDEX "Publicacao_entidadeId_idx" ON "public"."Publicacao"("entidadeId");

-- CreateIndex
CREATE INDEX "Vaga_publicadorId_idx" ON "public"."Vaga"("publicadorId");

-- CreateIndex
CREATE INDEX "Vaga_centroId_idx" ON "public"."Vaga"("centroId");

-- CreateIndex
CREATE INDEX "Vaga_entidadeId_idx" ON "public"."Vaga"("entidadeId");
