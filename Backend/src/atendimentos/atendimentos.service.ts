import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { PrioridadeAtendimento, SituacaoAtendimento } from '@prisma/client';

@Injectable()
export class AtendimentosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAtendimentoDto) {
    return this.prisma.atendimento.create({
      data: {
        ...dto,
        prioridade: dto.prioridade as PrioridadeAtendimento,
        situacao: dto.situacao as SituacaoAtendimento,
        contatoId: Number(dto.contatoId),
      },
    });
  }

  async findAll() {
    return this.prisma.atendimento.findMany({
      include: { contato: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const atendimento = await this.prisma.atendimento.findUnique({
      where: { id },
      include: { contato: true },
    });
    
    if (!atendimento) {
      throw new NotFoundException(`Atendimento #${id} não encontrado`);
    }
    
    return atendimento;
  }

  async update(id: number, dto: UpdateAtendimentoDto) {
    return this.prisma.atendimento.update({
      where: { id },
      data: {
        ...dto,
        prioridade: dto.prioridade as PrioridadeAtendimento,
        situacao: dto.situacao as SituacaoAtendimento,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.atendimento.delete({
      where: { id },
    });
  }
}