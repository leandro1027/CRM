import { IsInt, IsString, IsIn } from 'class-validator';

export class CreateAtendimentoDto {
  @IsInt()
  contatoId: number;

  @IsString()
  descricao: string;

  @IsString()
  combinado: string;

  @IsString()
  responsavel: string;

  @IsIn(['BAIXA', 'MEDIA', 'ALTA'])
  prioridade: string;

  @IsIn(['RESOLVIDO', 'EM_ANDAMENTO', 'AGUARDANDO_CLIENTE'])
  situacao: string;
}
