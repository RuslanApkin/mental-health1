import { Module } from '@nestjs/common';
import { CouchDbModule } from '../couchdb/couchdb.module';
import { EmotionsService } from './emotions.service';
import { EmotionsController } from './emotions.controller';

@Module({
  imports: [CouchDbModule],
  controllers: [EmotionsController],
  providers: [EmotionsService],
  exports: [EmotionsService],
})
export class EmotionsModule {}
