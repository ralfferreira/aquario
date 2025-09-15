/*
  Warnings:

  - You are about to drop the `ItemFAQ` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ItemFAQ" DROP CONSTRAINT "ItemFAQ_centroId_fkey";

-- DropTable
DROP TABLE "public"."ItemFAQ";
