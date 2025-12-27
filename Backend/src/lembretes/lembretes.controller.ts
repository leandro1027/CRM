import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LembretesService } from './lembretes.service';
import { CreateLembreteDto } from './dto/create-lembrete.dto';
import { UpdateLembreteDto } from './dto/update-lembrete.dto';

@Controller('lembretes')
export class LembretesController {
  constructor(private readonly lembretesService: LembretesService) {}

  @Post()
  create(@Body() createLembreteDto: CreateLembreteDto) {
    return this.lembretesService.create(createLembreteDto);
  }

  @Get()
  findAll() {
    return this.lembretesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lembretesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLembreteDto: UpdateLembreteDto) {
    return this.lembretesService.update(+id, updateLembreteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lembretesService.remove(+id);
  }
}
