import { Module } from '@nestjs/common';
import { CouchDbModule } from '../couchdb/couchdb.module';
import { EmotionsService } from './emotions.service';

@Module({
  imports: [CouchDbModule],
  providers: [EmotionsService],
  exports: [EmotionsService],
})
export class EmotionsModule {}
