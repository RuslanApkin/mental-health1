import { Injectable } from '@nestjs/common';
import { Command, Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CouchDbService } from '../couchdb/couchdb.service';
import { Chat, User } from '../couchdb/types';
import { EmotionsService } from '../emotions/emotions.service';
import { getEmotions } from 'src/utils';
import { ModelService } from '../model/model.service';
import { ConfigService } from '@nestjs/config';

@Update()
@Injectable()
export class BotService {
  private servedChats = [];

  constructor(
    private readonly couchDb: CouchDbService,
    private readonly emotionsService: EmotionsService,
    private readonly modelService: ModelService,
    private readonly configService: ConfigService,
  ) {}

  @Start()
  public async start(@Ctx() ctx: Context): Promise<void> {
    const chatId = ctx.message.chat.id;
    await this.getOrCreateUser(chatId);
    const CLIENT_URL = this.configService.get('CLIENT_URL');
    await ctx.setChatMenuButton({
      text: 'Home',
      web_app: { url: CLIENT_URL },
      type: 'web_app',
    });
    await ctx.reply(
      `Hello! I'm here to assist you in managing workplace stress. 
Before we begin I recomend you to complete the test below so that I will know you better.
Remember, it's important to prioritize your wellbeeing. 
Let's navigate this together!`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Take test',
                web_app: {
                  url: `${CLIENT_URL}/form`,
                },
              },
            ],
          ],
        },
      },
    );
  }

  @Command('test')
  public async test(@Ctx() ctx: Context): Promise<void> {
    const chatId = ctx.message.chat.id;
    this.getOrCreateUser(chatId);
    const CLIENT_URL = this.configService.get('CLIENT_URL');
    await ctx.setChatMenuButton({
      text: 'Home',
      web_app: { url: CLIENT_URL },
      type: 'web_app',
    });
    await ctx.reply(
      `Complete a test below for me to know your current level of work stress.`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Take test',
                web_app: {
                  url: `${CLIENT_URL}/form`,
                },
              },
            ],
          ],
        },
      },
    );
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
    let message_id: number;
    try {
      this.servedChats.push(chatId);
      message_id = (await ctx.reply('Please, wait for response')).message_id;
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
      await ctx.deleteMessage(message_id);
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
