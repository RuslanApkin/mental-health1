import { Injectable } from '@nestjs/common';
import { CouchDbService } from '../couchdb/couchdb.service';
import { Emotions } from '../couchdb/types';
import { emotionsCalc } from 'src/utils';
import nano from 'nano';

@Injectable()
export class EmotionsService {
  constructor(private readonly couchDb: CouchDbService) {}

  public async updateUserEmotionsByChatId(
    chatId: number,
    emotions: Emotions,
  ): Promise<nano.DocumentInsertResponse> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    user.emotions = user.emotions
      ? JSON.stringify(emotionsCalc(JSON.parse(user.emotions), emotions))
      : JSON.stringify(emotions);
    const response = await this.couchDb.updateUser(user);
    return response;
  }

  public async getEmotionsByChatId(
    chatId: number,
  ): Promise<{ emotions: Emotions; test_score: number }> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    return { emotions: JSON.parse(user.emotions), test_score: user.test_score };
  }

  public async updateUserScoreByChatId(
    chatId: number,
    test_score: number,
  ): Promise<nano.DocumentInsertResponse> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    user.test_score = test_score;
    const response = await this.couchDb.updateUser(user);
    return response;
  }
}
