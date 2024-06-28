import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { CouchDbService } from '../couchdb/couchdb.service';
import { User } from '../couchdb/types';

@Update()
@Injectable()
export class BotService {
  constructor(private readonly couchDb: CouchDbService) {}

  @Start()
  public async start(@Ctx() ctx: Context): Promise<void> {
    const chatId = ctx.message.chat.id;
    const users = await this.couchDb.getUserByChatId(chatId);
    let user: User;
    if (users.length === 0) {
      user = await this.couchDb.createUser({ chatId });
    } else user = users[0];
    await ctx.reply(JSON.stringify(user));
  }

  @On('message')
  public async on(
    @Ctx() ctx: Context,
    @Message('text') message: string,
  ): Promise<void> {
    const chatId = ctx.message.chat.id;
    console.log(chatId);
    await ctx.reply(message);
  }
}
