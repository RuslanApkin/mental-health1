import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CouchDbService } from '../couchdb/couchdb.service';
import { Chat, User } from '../couchdb/types';
import { EmotionsService } from '../emotions/emotions.service';
import { getEmotions } from 'src/utils';
import { ModelService } from '../model/model.service';

@Update()
@Injectable()
export class BotService {
  private servedChats = [];

  constructor(
    private readonly couchDb: CouchDbService,
    private readonly emotionsService: EmotionsService,
    private readonly modelService: ModelService,
  ) {}

  @Start()
  public async start(@Ctx() ctx: Context): Promise<void> {
    const chatId = ctx.message.chat.id;
    const user = await this.getOrCreateUser(chatId);
    await ctx.reply(JSON.stringify(user.chatId));
  }

  @On('message')
  public async on(
    @Ctx() ctx: Context,
    @Message('text') message: string,
  ): Promise<void> {
    const chatId = ctx.message.chat.id;
    if (this.servedChats.includes(chatId)) {
      console.log('includes: ' + JSON.stringify(this.servedChats));
      return;
    }
    let response: string;
    try {
      this.servedChats.push(chatId);
      const { message_id } = await ctx.reply('Please, wait for response');
      ctx.sendChatAction('typing');

      const emotions = await getEmotions(message);
      await this.emotionsService.updateUserEmotionsByChatId(chatId, emotions);

      const user = await this.getOrCreateUser(chatId);

      const chat: Chat = JSON.parse(user.chat);
      chat.push({ role: 'user', content: message });

      response = await this.modelService.getResponse(chat);

      chat.push({ role: 'assistant', content: response });
      user.chat = JSON.stringify(chat);

      this.couchDb.updateUser(user);
      await ctx.deleteMessage(message_id);
    } catch (error) {
      console.log(error);
      this.servedChats = this.servedChats.filter((item) => item !== chatId);
      await ctx.reply('Error occured. Please try later...');
      return;
    }

    this.servedChats = this.servedChats.filter((item) => item !== chatId);
    await ctx.replyWithMarkdown(response);
  }

  private async getOrCreateUser(chatId: number): Promise<User> {
    const users = await this.couchDb.getUserByChatId(chatId);
    if (users.length === 0) {
      return await this.couchDb.createUser(chatId);
    }
    return users[0];
  }
}
