import { Injectable } from '@nestjs/common';
import { CouchDbService } from '../couchdb/couchdb.service';
import { Emotions } from '../couchdb/types';
import { emotionsCalc } from 'src/utils';

@Injectable()
export class EmotionsService {
  constructor(private readonly couchDb: CouchDbService) {}

  public async updateUserEmotionsByChatId(chatId: number, emotions: Emotions) {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    user.emotions = user.emotions
      ? emotionsCalc(user.emotions, emotions)
      : emotions;
    const response = await this.couchDb.updateUser(user);
    return response;
  }

  public async getEmotionsByChatId(chatId: number): Promise<Emotions> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    return user.emotions;
  }
}
