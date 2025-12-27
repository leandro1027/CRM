import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDisparoDto } from './dto/create-disparo.dto';

@Injectable()
export class DisparosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDisparoDto) {
    return this.prisma.disparo.create({
      data: {
        contatoId: dto.contatoId,
        mensagem: dto.mensagem,
      },
    });
  }

  async findAll() {
    return this.prisma.disparo.findMany({
      include: { contato: true },
      orderBy: { dataEnvio: 'desc' },
    });
  }
}
