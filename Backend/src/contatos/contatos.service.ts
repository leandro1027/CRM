import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrigemContato, StatusContato } from '@prisma/client';
import axios from 'axios';
import { CreateContatoDto } from './dto/create-contato.dto';
import { ImportarTxtResponseDto } from './dto/importar-txt-response.dto';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  // ============================
  // IMPORTAÇÃO TXT (Nome, CNPJ, Telefone)
  // ============================
  async importarTxt(file: Express.Multer.File): Promise<ImportarTxtResponseDto> {
    const linhas = file.buffer
      .toString('utf-8')
      .split(/\r?\n/)
      .map((linha) => linha.trim())
      .filter(Boolean);

    let totalProcessados = 0;
    let totalImportados = 0;
    let ignorados = 0;

    for (let i = 0; i < linhas.length; i += 3) {
      totalProcessados++;
      const nomeRaw = linhas[i];
      const cnpjRaw = linhas[i + 1];
      const telefoneRaw = linhas[i + 2];

      if (!nomeRaw || !telefoneRaw) {
        ignorados++;
        continue;
      }

      const nome = this.limparNome(nomeRaw);
      const telefone = this.formatarTelefone(telefoneRaw);
      const cnpj = cnpjRaw ? cnpjRaw.replace(/\D/g, '') : null;

      if (!nome || !telefone) {
        ignorados++;
        continue;
      }

      try {
        await this.prisma.contato.upsert({
          where: { telefone },
          update: { nome, cnpj, origem: OrigemContato.TXT },
          create: { 
            nome, 
            telefone, 
            cnpj, 
            origem: OrigemContato.TXT, 
            status: StatusContato.NOVO 
          },
        });
        totalImportados++;
      } catch {
        ignorados++;
      }
    }
    return { totalProcessados, totalImportados, ignorados };
  }

  // ============================
  // CRIAÇÃO MANUAL (Suporta Máscara do Front)
  // ============================
  async criarManual(dto: CreateContatoDto) {
    // A função formatarTelefone já remove ( ) - . e espaços
    const telefone = this.formatarTelefone(dto.telefone);
    
    if (!telefone) {
      throw new BadRequestException('Formato de telefone inválido. Use DDD + 9 + Número.');
    }

    const existe = await this.prisma.contato.findUnique({ where: { telefone } });
    if (existe) {
      throw new BadRequestException('Este número de telefone já está cadastrado na base.');
    }

    return this.prisma.contato.create({
      data: {
        nome: this.limparNome(dto.nome),
        telefone,
        cnpj: dto.cnpj ?? null,
        // Garante que a origem seja MANUAL se o front enviar vazio
        origem: dto.origem || OrigemContato.MANUAL,
        status: StatusContato.NOVO,
      },
    });
  }

  // ============================
  // LISTAGENS E BUSCAS
  // ============================
  async listar() {
    return this.prisma.contato.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async listarUltimos() {
    return this.prisma.contato.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
  }

  async buscarPorTelefone(telefone: string) {
    const tel = this.formatarTelefone(telefone);
    if (!tel) throw new BadRequestException('Telefone inválido');
    return this.prisma.contato.findUnique({ where: { telefone: tel } });
  }

  async atualizarStatus(id: number, status: StatusContato) {
    return this.prisma.contato.update({ where: { id }, data: { status } });
  }

  async prospectar(filtros: any) {
    return { quantidade: 0, mensagem: 'Funcionalidade aguardando integração de API paga' };
  }

  // ============================
  // REGRAS DE FORMATAÇÃO
  // ============================
  private limparNome(texto: string): string {
    return texto.replace(/\d+/g, '').replace(/\s+/g, ' ').trim().toUpperCase();
  }

  private formatarTelefone(telefone: string): string | null {
    if (!telefone) return null;

    // Remove TUDO que não for número (limpa a máscara do front: ( ) - . e espaços)
    let tel = telefone.replace(/\D/g, ''); 
    
    if (tel.startsWith('0')) tel = tel.substring(1);

    // Ignora números fixos (que começam com 3)
    if (tel.startsWith('3') || tel.startsWith('35')) return null; 
    
    // Converte celulares antigos de 10 dígitos para 11 (adicionando o 9)
    if (tel.length === 10) {
      tel = tel.slice(0, 2) + '9' + tel.slice(2);
    }

    // Valida se ficou com 11 dígitos e se o nono dígito é 9
    if (tel.length !== 11 || tel[2] !== '9') return null;
    
    return tel;
  }
}