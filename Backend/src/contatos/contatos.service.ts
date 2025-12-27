import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrigemContato, StatusContato } from '@prisma/client';
import { ImportarTxtResponseDto } from './dto/importar-txt-response.dto';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  async importarTxt(file: Express.Multer.File): Promise<ImportarTxtResponseDto> {
    const linhas = file.buffer
      .toString('utf-8')
      .split('\n')
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
      } catch (error) {
        // erro comum: telefone duplicado (unique)
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

    if (tel.startsWith('0')) {
      tel = tel.substring(1);
    }

    // ignora telefone fixo
    if (tel.startsWith('3') || tel.startsWith('35')) {
      return null;
    }

    // celular antigo (10 dígitos)
    if (tel.length === 10) {
      tel = tel.slice(0, 2) + '9' + tel.slice(2);
    }

    if (tel.length !== 11 || tel[2] !== '9') {
      return null;
    }

    return tel;
  }
}
