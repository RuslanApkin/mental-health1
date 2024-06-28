import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        token:
          process.env.TELEGRAM_TOKEN || configService.get('TELEGRAM_TOKEN'),
      }),
    }),
  ],
})
export class BotModule {}
