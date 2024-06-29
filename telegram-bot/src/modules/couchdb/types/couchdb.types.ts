import * as nano from 'nano';

export interface IUser extends nano.MaybeDocument {
  chatId: number;
  emotions: string;
  chat: string;
  test_score: number;
}

export interface Emotions {
  anger: number;
  sadness: number;
  fear: number;
  surprise: number;
  joy: number;
  neutral: number;
  disgust: number;
}

export type Chat = Array<Message>;

export interface Message {
  role: string;
  content: string;
}

export class User implements IUser {
  public _id: string;
  public _rev: string;
  public chatId: number;
  public emotions: string;
  public chat: string;
  public test_score: number;

  constructor(
    chatId: number,
    emotions?: string,
    chat?: string,
    test_score?: number,
  ) {
    this._id = undefined;
    this._rev = undefined;
    this.chatId = chatId;
    if (emotions) this.emotions = emotions;
    else this.emotions = undefined;
    if (chat) this.chat = chat;
    else this.chat = '[]';
    if (test_score) this.test_score = test_score;
    else this.test_score = undefined;
  }

  processAPIResponse(response: nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id;
      this._rev = response.rev;
    }
  }
}
