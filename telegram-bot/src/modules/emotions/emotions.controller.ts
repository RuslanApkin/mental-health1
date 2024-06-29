import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { Emotions } from '../couchdb/types';
import { EmotionsService } from './emotions.service';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsServcie: EmotionsService) {}

  @Get(':id')
  public async getEmotionsByChatId(
    @Param('id') chatId: string,
  ): Promise<{ emotions: Emotions; test_score: number }> {
    return await this.emotionsServcie.getEmotionsByChatId(Number(chatId));
  }
}

@Controller('score')
export class ScoreController {
  constructor(private readonly emotionsServcie: EmotionsService) {}

  @Post(':id')
  public async updateUserScoreByChatI(
    @Param('id') chatId: string,
    @Body() body: { test_score: number },
  ): Promise<string> {
    const response = await this.emotionsServcie.updateUserScoreByChatId(
      Number(chatId),
      body.test_score,
    );
    if (!response.ok)
      throw new InternalServerErrorException('Cannot update user score');
    return 'ok';
  }
}
