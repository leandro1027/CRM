/*
  Warnings:

  - The values [RECEITA] on the enum `OrigemContato` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrigemContato_new" AS ENUM ('TXT', 'MANUAL', 'CNPJ');
ALTER TABLE "Contato" ALTER COLUMN "origem" TYPE "OrigemContato_new" USING ("origem"::text::"OrigemContato_new");
ALTER TYPE "OrigemContato" RENAME TO "OrigemContato_old";
ALTER TYPE "OrigemContato_new" RENAME TO "OrigemContato";
DROP TYPE "public"."OrigemContato_old";
COMMIT;
