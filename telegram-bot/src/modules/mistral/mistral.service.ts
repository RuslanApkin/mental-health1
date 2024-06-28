import { Injectable } from '@nestjs/common';
//import { pipeline } from '@xenova/transformers';

@Injectable()
export class MistralService {
  constructor() {}
  public async getResponse() //chat: Array<{ role: string; content: string }>,
  : Promise<string> {
    //const pipe = await pipeline(
    //  'text-generation',
    //  'mistralai/Mistral-7B-Instruct-v0.2',
    //);
    //const response = await pipe(chat);
    //return response[0]['generated_text'][-1]['content'];
    return 'response';
  }
}
