import { Body, Controller, Get, Post } from '@nestjs/common';
import { DisparosService } from './disparos.service';
import { CreateDisparoDto } from './dto/create-disparo.dto';

@Controller('disparos')
export class DisparosController {
  constructor(private readonly service: DisparosService) {}

  @Post()
  create(@Body() dto: CreateDisparoDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
