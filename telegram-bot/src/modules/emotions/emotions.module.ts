import { Module } from '@nestjs/common';
import { CouchDbModule } from '../couchdb/couchdb.module';
import { EmotionsService } from './emotions.service';
import { EmotionsController, ScoreController } from './emotions.controller';

@Module({
  imports: [CouchDbModule],
  controllers: [EmotionsController, ScoreController],
  providers: [EmotionsService],
  exports: [EmotionsService],
})
export class EmotionsModule {}
