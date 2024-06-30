import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CouchDbService } from '../couchdb/couchdb.service';
import { Emotions } from '../couchdb/types';
import { emotionsCalc } from 'src/utils';
import nano from 'nano';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmotionsService {
  constructor(
    private readonly couchDb: CouchDbService,
    private readonly configService: ConfigService,
  ) {}

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
  ): Promise<{ emotions: Emotions; test_score: any }> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    return {
      emotions: user.emotions ? JSON.parse(user.emotions) : '',
      test_score: user.emotions ? JSON.parse(user.test_score) : '',
    };
  }

  public async updateUserScoreByChatId(
    chatId: number,
    body: any,
  ): Promise<any> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) throw new Error('User not found');
    const user = users[0];
    const data = await axios.post(this.configService.get('FORM_URL'), body);
    console.log('data: ' + JSON.stringify(data.data));
    user.test_score = JSON.stringify(data.data);
    const response = await this.couchDb.updateUser(user);
    if (!response.ok)
      throw new InternalServerErrorException('Cannot update user score');
    return data.data;
  }
}
