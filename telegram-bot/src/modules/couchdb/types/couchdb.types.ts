import * as nano from 'nano';

export interface IUser extends nano.MaybeDocument {
  chatId: number;
  emotions: string;
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

export class User implements IUser {
  public _id: string;
  public _rev: string;
  public chatId: number;
  public emotions: string;

  constructor(chatId: number, emotions: Emotions | string) {
    this._id = undefined;
    this._rev = undefined;
    this.chatId = chatId;
    this.emotions =
      typeof emotions === 'string' ? emotions : JSON.stringify(emotions);
  }

  processAPIResponse(response: nano.DocumentInsertResponse) {
    if (response.ok === true) {
      this._id = response.id;
      this._rev = response.rev;
    }
  }
}
