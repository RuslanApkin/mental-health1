import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { CouchDbModule } from '../couchdb/couchdb.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async () => ({
        token: process.env.TELEGRAM_TOKEN,
      }),
    }),
    CouchDbModule,
  ],
  providers: [BotService],
})
export class BotModule {}
