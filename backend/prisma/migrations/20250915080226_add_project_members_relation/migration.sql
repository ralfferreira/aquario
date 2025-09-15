-- CreateTable
CREATE TABLE "public"."_MembrosDoProjeto" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MembrosDoProjeto_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MembrosDoProjeto_B_index" ON "public"."_MembrosDoProjeto"("B");

-- AddForeignKey
ALTER TABLE "public"."_MembrosDoProjeto" ADD CONSTRAINT "_MembrosDoProjeto_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Projeto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_MembrosDoProjeto" ADD CONSTRAINT "_MembrosDoProjeto_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
