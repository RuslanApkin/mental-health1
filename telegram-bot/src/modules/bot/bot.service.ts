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
    const users = await this.couchDb.getUserByChatId(chatId);
    let user: User;
    if (users.length === 0) {
      const emotions = await getEmotions('start');
      user = await this.couchDb.createUser({
        chatId,
        emotions: JSON.stringify(emotions),
      });
    } else user = users[0];
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

    const response = await this.misrtralService.getResponse([
      {
        role: 'user',
        content: message,
      },
    ]);
    await ctx.reply(response);
  }
}
