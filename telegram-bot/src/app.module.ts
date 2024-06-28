import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BotModule } from './modules/bot/bot.module';
import { CouchDbModule } from './modules/couchdb/couchdb.module';
import { EmotionsModule } from './modules/emotions/emotions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./env/.${process.env.NODE_ENV}.env`,
    }),
    BotModule,
    CouchDbModule,
    EmotionsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
