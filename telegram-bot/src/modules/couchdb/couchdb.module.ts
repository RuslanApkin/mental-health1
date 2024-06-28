import { Module } from '@nestjs/common';
import { CouchDbService } from './couchdb.service';

@Module({
  providers: [CouchDbService],
  exports: [CouchDbService],
})
export class CouchDbModule {}
