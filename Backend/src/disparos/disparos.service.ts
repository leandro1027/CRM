import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisparoDto } from './dto/create-disparo.dto';
import { StatusContato } from '@prisma/client';

@Injectable()
export class DisparosService {
  constructor(private prisma: PrismaService) {}

  async criar(dto: CreateDisparoDto) {
    const contato = await this.prisma.contato.findUnique({
      where: { id: dto.contatoId },
    });

    if (!contato) throw new NotFoundException('Contato não encontrado');

    // cria registro de disparo
    const disparo = await this.prisma.disparo.create({
      data: {
        contatoId: dto.contatoId,
        mensagem: dto.mensagem,
      },
    });

    // atualiza status do lead
    await this.prisma.contato.update({
      where: { id: dto.contatoId },
      data: {
        status: StatusContato.ENVIADO,
      },
    });

    return disparo;
  }

  async listar() {
    return this.prisma.disparo.findMany({
      include: {
        contato: true,
      },
      orderBy: { dataEnvio: 'desc' },
    });
  }

  async listarPorContato(contatoId: number) {
    return this.prisma.disparo.findMany({
      where: { contatoId },
      orderBy: { dataEnvio: 'desc' },
    });
  }
}
