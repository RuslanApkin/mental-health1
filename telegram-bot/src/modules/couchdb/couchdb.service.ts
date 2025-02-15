import { Injectable } from '@nestjs/common';
import * as nano from 'nano';
import { User } from './types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CouchDbService {
  private readonly db: nano.DocumentScope<User>;

  constructor(private readonly configService: ConfigService) {
    console.log(
      `http://${this.configService.get('COUCHDB_USER')}:${this.configService.get('COUCHDB_PASSWORD')}@${this.configService.get('COUCHDB_URL')}`,
    );
    const couch = nano(
      `http://${this.configService.get('COUCHDB_USER')}:${this.configService.get('COUCHDB_PASSWORD')}@${this.configService.get('COUCHDB_URL')}`,
    );
    this.db = couch.db.use('users');
  }

  public async createUser(chatId: number): Promise<User> {
    const u = new User(chatId);
    const response = await this.db.insert(u).then((response) => {
      u.processAPIResponse(response);
      return u;
    });
    return response;
  }

  public async getUserByChatId(chatId: number): Promise<User[]> {
    const response = await this.db.find({ selector: { chatId: chatId } });
    return response.docs;
  }

  public async updateUser(u: User): Promise<nano.DocumentInsertResponse> {
    const response = await this.db.insert(u);
    return response;
  }
}
