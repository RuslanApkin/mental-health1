import { Controller, Get, Param } from '@nestjs/common';
import { Emotions } from '../couchdb/types';
import { EmotionsService } from './emotions.service';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsServcie: EmotionsService) {}

  @Get(':id')
  public async getEmotionsByChatId(
    @Param('id') chatId: number,
  ): Promise<Emotions> {
    return await this.emotionsServcie.getEmotionsByChatId(chatId);
  }
}
