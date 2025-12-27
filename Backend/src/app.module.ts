import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContatosModule } from './contatos/contatos.module';
import { DisparosModule } from './disparos/disparos.module';
import { AtendimentosModule } from './atendimentos/atendimentos.module';
import { LembretesModule } from './lembretes/lembretes.module';

@Module({
  imports: [ContatosModule, DisparosModule, AtendimentosModule, LembretesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
