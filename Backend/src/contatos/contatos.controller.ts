import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContatosService } from './contatos.service';
import { ImportarTxtResponseDto } from './dto/importar-txt-response.dto';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  /**
   * Importa contatos a partir de um arquivo TXT
   * Cada 2 linhas:
   * Linha 1: Nome
   * Linha 2: Telefone
   */
  @Post('importar-txt')
  @UseInterceptors(FileInterceptor('file'))
  importarTxt(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImportarTxtResponseDto> {
    return this.contatosService.importarTxt(file);
  }
}
