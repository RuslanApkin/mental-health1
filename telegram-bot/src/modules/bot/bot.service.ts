import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CouchDbService } from '../couchdb/couchdb.service';
import { User } from '../couchdb/types';
import { EmotionsService } from '../emotions/emotions.service';
import { getEmotions } from 'src/utils';
import { ModelService } from '../model/model.service';

@Update()
@Injectable()
export class BotService {
  constructor(
    private readonly couchDb: CouchDbService,
    private readonly emotionsService: EmotionsService,
    private readonly misrtralService: ModelService,
  ) {}

  @Start()
  public async start(@Ctx() ctx: Context): Promise<void> {
    const chatId = ctx.message.chat.id;
    const user = await this.getOrCreateUser(chatId);
    await ctx.reply(user.emotions);
  }

  @On('message')
  public async on(
    @Ctx() ctx: Context,
    @Message('text') message: string,
  ): Promise<void> {
    const chatId = ctx.message.chat.id;

    const emotions = await getEmotions(message);
    await this.emotionsService.updateUserEmotionsByChatId(chatId, emotions);

    const user = await this.getOrCreateUser(chatId);

    const response = await this.misrtralService.getResponse(
      JSON.parse(user.chat),
    );
    await ctx.reply(response);
  }

  private async getOrCreateUser(chatId: number): Promise<User> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) {
      const emotions = await getEmotions('start');
      return await this.couchDb.createUser({
        chatId,
        emotions: JSON.stringify(emotions),
        chat: JSON.stringify([]),
      });
    }
    return users[0];
  }
}
