import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDisparoDto {
  @IsNumber()
  contatoId: number;

  @IsString()
  @IsNotEmpty()
  mensagem: string;
}
