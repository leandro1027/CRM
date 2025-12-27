-- CreateEnum
CREATE TYPE "OrigemContato" AS ENUM ('TXT', 'RECEITA');

-- CreateEnum
CREATE TYPE "StatusContato" AS ENUM ('NOVO', 'ENVIADO', 'RESPONDEU', 'CLIENTE');

-- CreateEnum
CREATE TYPE "PrioridadeAtendimento" AS ENUM ('BAIXA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "SituacaoAtendimento" AS ENUM ('RESOLVIDO', 'EM_ANDAMENTO', 'AGUARDANDO_CLIENTE');

-- CreateTable
CREATE TABLE "Contato" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cnpj" TEXT,
    "cnae" TEXT,
    "origem" "OrigemContato" NOT NULL,
    "status" "StatusContato" NOT NULL DEFAULT 'NOVO',
    "grupoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoCliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "mensagemPadrao" TEXT NOT NULL,
    "limiteDiario" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GrupoCliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disparo" (
    "id" SERIAL NOT NULL,
    "contatoId" INTEGER NOT NULL,
    "mensagem" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Disparo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "id" SERIAL NOT NULL,
    "contatoId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "combinado" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "prioridade" "PrioridadeAtendimento" NOT NULL,
    "situacao" "SituacaoAtendimento" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lembrete" (
    "id" SERIAL NOT NULL,
    "contatoId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lembrete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contato_telefone_key" ON "Contato"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Contato" ADD CONSTRAINT "Contato_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "GrupoCliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Disparo" ADD CONSTRAINT "Disparo_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lembrete" ADD CONSTRAINT "Lembrete_contatoId_fkey" FOREIGN KEY ("contatoId") REFERENCES "Contato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
