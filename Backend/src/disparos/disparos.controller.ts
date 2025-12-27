import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DisparosService } from './disparos.service';
import { CreateDisparoDto } from './dto/create-disparo.dto';
import { UpdateDisparoDto } from './dto/update-disparo.dto';

@Controller('disparos')
export class DisparosController {
  constructor(private readonly disparosService: DisparosService) {}

  @Post()
  create(@Body() createDisparoDto: CreateDisparoDto) {
    return this.disparosService.create(createDisparoDto);
  }

  @Get()
  findAll() {
    return this.disparosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disparosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDisparoDto: UpdateDisparoDto) {
    return this.disparosService.update(+id, updateDisparoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disparosService.remove(+id);
  }
}
