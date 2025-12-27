import { Module } from '@nestjs/common';
import { DisparosService } from './disparos.service';
import { DisparosController } from './disparos.controller';

@Module({
  controllers: [DisparosController],
  providers: [DisparosService],
})
export class DisparosModule {}
