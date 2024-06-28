import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: async () => ({
        token: process.env.TELEGRAM_TOKEN,
      }),
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
