import { Injectable } from '@nestjs/common';
import { CreateDisparoDto } from './dto/create-disparo.dto';
import { UpdateDisparoDto } from './dto/update-disparo.dto';

@Injectable()
export class DisparosService {
  create(createDisparoDto: CreateDisparoDto) {
    return 'This action adds a new disparo';
  }

  findAll() {
    return `This action returns all disparos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} disparo`;
  }

  update(id: number, updateDisparoDto: UpdateDisparoDto) {
    return `This action updates a #${id} disparo`;
  }

  remove(id: number) {
    return `This action removes a #${id} disparo`;
  }
}
