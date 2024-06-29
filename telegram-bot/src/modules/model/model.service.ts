import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ollama } from 'ollama';
//import { pipeline } from '@xenova/transformers';

@Injectable()
export class ModelService {
  private readonly ollama: Ollama;
  constructor(private readonly configService: ConfigService) {
    this.ollama = new Ollama({ host: this.configService.get('MODEL_URL') });
    this.ollama.chat({ model: this.configService.get('MODEL') }); // preload the model
  }
  public async getResponse(
    chat: Array<{ role: string; content: string }>,
  ): Promise<string> {
    const response = await this.ollama.chat({
      model: this.configService.get('MODEL'),
      messages: chat,
      stream: false,
    });

    console.log(JSON.stringify(response));

    return response.message.content;
  }
}
