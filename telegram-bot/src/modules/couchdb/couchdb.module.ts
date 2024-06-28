import { Module } from '@nestjs/common';
import { CouchdbService } from './couchdb.service';

@Module({
  providers: [CouchdbService],
})
export class CouchdbModule {}
