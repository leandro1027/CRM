import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DisparosService } from './disparos.service';
import { CreateDisparoDto } from './dto/create-disparo.dto';

@Controller('disparos')
export class DisparosController {
  constructor(private readonly service: DisparosService) {}

  @Post()
  criar(@Body() dto: CreateDisparoDto) {
    return this.service.criar(dto);
  }

  @Get()
  listar() {
    return this.service.listar();
  }

  @Get('contato/:id')
  listarPorContato(@Param('id', ParseIntPipe) id: number) {
    return this.service.listarPorContato(id);
  }
}
