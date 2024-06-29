import { Injectable } from '@nestjs/common';
//import { pipeline } from '@xenova/transformers';

@Injectable()
export class ModelService {
  constructor() {}
  public async getResponse() //chat: Array<{ role: string; content: string }>,
  : Promise<string> {
    return 'response';
  }
}
