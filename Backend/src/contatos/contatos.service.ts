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
  // IMPORTAÇÃO TXT
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

    for (let i = 0; i < linhas.length; i += 2) {
      totalProcessados++;

      const nomeRaw = linhas[i];
      const telefoneRaw = linhas[i + 1];

      if (!telefoneRaw) {
        ignorados++;
        continue;
      }

      const nome = this.limparNome(nomeRaw);
      const telefone = this.formatarTelefone(telefoneRaw);

      if (!nome || !telefone) {
        ignorados++;
        continue;
      }

      try {
        await this.prisma.contato.create({
          data: {
            nome,
            telefone,
            origem: OrigemContato.TXT,
            status: StatusContato.NOVO,
          },
        });

        totalImportados++;
      } catch {
        ignorados++;
      }
    }

    return {
      totalProcessados,
      totalImportados,
      ignorados,
    };
  }

  // ============================
  // CRIAÇÃO MANUAL
  // ============================

  async criarManual(dto: CreateContatoDto) {
    const telefone = this.formatarTelefone(dto.telefone);

    if (!telefone) {
      throw new BadRequestException('Telefone inválido');
    }

    return this.prisma.contato.create({
      data: {
        nome: this.limparNome(dto.nome),
        telefone,
        cnpj: dto.cnpj ?? null,
        cnae: dto.cnae ?? null,
        origem: dto.origem ?? OrigemContato.MANUAL,
        status: StatusContato.NOVO,
      },
    });
  }

  // ============================
  // VIA CNPJ API RECEITA
  // ============================

  async criarViaCnpj(cnpj: string) {
    const clean = cnpj.replace(/\D/g, '');

    const response = await axios.get(
      `https://publica.cnpj.ws/cnpj/${clean}`,
    );

    const data: any = response.data;

    const telefone = this.formatarTelefone(
      data.estabelecimento?.telefone1 ||
        data.estabelecimento?.telefone2 ||
        '',
    );

    if (!telefone) {
      throw new BadRequestException('Telefone inválido ou não encontrado');
    }

    return this.prisma.contato.create({
      data: {
        nome:
          data.razao_social ||
          data.nome_fantasia ||
          data.estabelecimento?.nome_fantasia ||
          'EMPRESA',

        telefone,
        cnpj: clean,
        cnae: data.estabelecimento?.atividade_principal?.id || null,
        origem: OrigemContato.CNPJ,
        status: StatusContato.NOVO,
      },
    });
  }

  // ============================
  // LISTAR CONTATOS
  // ============================

  async listar() {
    return this.prisma.contato.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // ============================
  // BUSCAR POR TELEFONE
  // ============================

  async buscarPorTelefone(telefone: string) {
    const tel = this.formatarTelefone(telefone);

    if (!tel) throw new BadRequestException('Telefone inválido');

    return this.prisma.contato.findUnique({
      where: { telefone: tel },
    });
  }

  // ============================
  // ATUALIZAR STATUS
  // ============================

  async atualizarStatus(id: number, status: StatusContato) {
    return this.prisma.contato.update({
      where: { id },
      data: { status },
    });
  }

  // ============================
  // REGRAS DE NEGÓCIO
  // ============================

  private limparNome(texto: string): string {
    return texto
      .replace(/\d+/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toUpperCase();
  }

  private formatarTelefone(telefone: string): string | null {
    let tel = telefone.replace(/\D/g, '');

    if (tel.startsWith('0')) tel = tel.substring(1);

    // ignora fixo
    if (tel.startsWith('3') || tel.startsWith('35')) return null;

    // celular antigo 10 dígitos
    if (tel.length === 10) {
      tel = tel.slice(0, 2) + '9' + tel.slice(2);
    }

    if (tel.length !== 11 || tel[2] !== '9') return null;

    return tel;
  }
}
