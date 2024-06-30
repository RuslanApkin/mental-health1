import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { CouchDbModule } from '../couchdb/couchdb.module';
import { EmotionsModule } from '../emotions/emotions.module';
import { ConfigService } from '@nestjs/config';
import { ModelModule } from '../model/model.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token:
          process.env.TELEGRAM_TOKEN || configService.get('TELEGRAM_TOKEN'),
      }),
    }),
    CouchDbModule,
    EmotionsModule,
    ModelModule,
  ],
  providers: [BotService],
})
export class BotModule {}
