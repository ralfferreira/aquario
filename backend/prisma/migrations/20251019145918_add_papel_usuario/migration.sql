-- CreateEnum
CREATE TYPE "public"."PapelPlataforma" AS ENUM ('USER', 'MASTER_ADMIN');

-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "papelPlataforma" "public"."PapelPlataforma" NOT NULL DEFAULT 'USER';
