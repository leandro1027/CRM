import { IsInt, IsString } from 'class-validator';

export class CreateDisparoDto {
  @IsInt()
  contatoId: number;

  @IsString()
  mensagem: string;
}
