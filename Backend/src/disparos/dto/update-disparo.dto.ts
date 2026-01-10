import { IsEnum } from 'class-validator';
import { StatusContato } from '@prisma/client';

export class UpdateStatusContatoDto {
  @IsEnum(StatusContato)
  status: StatusContato;
}
