import { Injectable } from '@nestjs/common';
import { Ctx, Message, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
@Injectable()
export class BotService {
  constructor() {}

  @Start()
  public async start(@Ctx() ctx: Context): Promise<void> {
    await ctx.reply('Hello!');
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
