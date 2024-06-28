import { Module } from '@nestjs/common';
import { CouchDbModule } from '../couchdb/couchdb.module';

@Module({ imports: [CouchDbModule] })
export class EmotionsModule {}
