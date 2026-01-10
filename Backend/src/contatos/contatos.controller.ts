import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContatosService } from './contatos.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { StatusContato } from '@prisma/client';

@Controller('contatos')
export class ContatosController {
  constructor(private readonly contatosService: ContatosService) {}

  @Post('importar-txt')
  @UseInterceptors(FileInterceptor('file'))
  importarTxt(@UploadedFile() file: Express.Multer.File) {
    return this.contatosService.importarTxt(file);
  }

  @Post()
  criarManual(@Body() dto: CreateContatoDto) {
    return this.contatosService.criarManual(dto);
  }

  @Post('cnpj/:cnpj')
  criarViaCnpj(@Param('cnpj') cnpj: string) {
    return this.contatosService.criarViaCnpj(cnpj);
  }

  @Get()
  listar() {
    return this.contatosService.listar();
  }

  @Get('telefone/:telefone')
  buscarPorTelefone(@Param('telefone') telefone: string) {
    return this.contatosService.buscarPorTelefone(telefone);
  }

  @Patch(':id/status')
  atualizarStatus(
    @Param('id') id: string,
    @Body('status') status: StatusContato,
  ) {
    return this.contatosService.atualizarStatus(Number(id), status);
  }
}
