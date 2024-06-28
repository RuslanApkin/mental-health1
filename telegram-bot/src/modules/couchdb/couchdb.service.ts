import { Injectable } from '@nestjs/common';
import * as nano from 'nano';
import { Emotions, User } from './types';
import { emotionsCalc } from 'src/utils';

@Injectable()
export class CouchDbService {
  private readonly db: nano.DocumentScope<User>;

  constructor() {
    const couch = nano('http://localhost:5984');
    this.db = couch.db.use<User>('users');
  }

  public async createUser(user: User) {
    const response = await this.db.insert(user);
    return response;
  }

  public async updateUserEmotionsByChatId(chatId: number, emotions: Emotions) {
    const user = await this.getUserByChatId(chatId);
    if (user) {
      user.emotions = emotionsCalc(user.emotions, emotions);
      const response = await this.db.insert(user);
      return response;
    }
    throw new Error('User not found');
  }

  public async getEmotionsByChatId(chatId: number): Promise<Emotions> {
    const user = await this.getUserByChatId(chatId);
    if (user) {
      return user.emotions;
    }
    throw new Error('User not found');
  }

  private async getUserByChatId(chatId: number): Promise<User> {
    const response = await this.db.find({ selector: { chatId } });
    if (response.docs.length) {
      return response.docs[0];
    }
    throw new Error('User not found');
  }
}
