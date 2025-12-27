import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OrigemContato } from '@prisma/client';

export class CreateContatoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsString()
  cnae?: string;

  @IsEnum(OrigemContato)
  origem: OrigemContato;
}
