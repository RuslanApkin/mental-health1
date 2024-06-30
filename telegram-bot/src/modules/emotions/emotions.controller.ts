import { Body, Controller, Param, Post } from '@nestjs/common';
import { Emotions } from '../couchdb/types';
import { EmotionsService } from './emotions.service';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsServcie: EmotionsService) {}

  @Post(':id')
  public async getEmotionsByChatId(
    @Param('id') chatId: string,
  ): Promise<{ emotions: Emotions; test_score: any }> {
    return await this.emotionsServcie.getEmotionsByChatId(Number(chatId));
  }
}

@Controller('score')
export class ScoreController {
  constructor(private readonly emotionsServcie: EmotionsService) {}

  @Post(':id')
  public async updateUserScoreByChatI(
    @Param('id') chatId: string,
    @Body() body: any,
  ): Promise<any> {
    console.log('body: ' + JSON.stringify(body));
    const response = await this.emotionsServcie.updateUserScoreByChatId(
      Number(chatId),
      body,
    );
    return response;
  }
}
