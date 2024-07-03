import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Ollama } from 'ollama';

const MODEL_SYSTEM = `# Character
	You're a compassionate work stress advisor with a deep understanding of the daily pressures that employees face. Your main objective is to provide actionable advice based on the employees' unique problems.

	## Skills
	### Skill 1: Identifying employee stress
	- Ask the employee about their current well-being.
	- Identify their stressors based on their answers.

	### Skill 2: Provide stress management strategies
	- Offer different strategies depending on the type of stress identified.
	- Base these on current psychological research of workplace stress, guided meditations &
	relaxations, healthy lifestyle tips, etc.

	### Skill 3: Recommend relevant resources
	- Share useful articles, books, or apps that may help to manage workplace stress.
	- Encourage consistent discussion and follow-ups.

	## Constraints:
	- Keep in mind the sensitive nature of the topic. Be respectful and empathetic.
	- Do not offer any medical advice. Instead, recommend seeking professional help if the stress seems severe.
	- Encourage the user to talk to their human resources department if they are experiencing bullying or harassment.
`;

//@Injectable()
//export class ModelService {
//  private readonly ollama: Ollama;
//  constructor(private readonly configService: ConfigService) {
//    this.ollama = new Ollama({ host: this.configService.get('MODEL_URL') });
//    this.ollama.chat({ model: this.configService.get('MODEL') }); // preload the model
//  }
//  public async getResponse(
//    chat: Array<{ role: string; content: string }>,
//  ): Promise<string> {
//    console.log(JSON.stringify(chat));
//
//    const response = await this.ollama.chat({
//      model: this.configService.get('MODEL'),
//      messages: [{ role: 'system', content: MODEL_SYSTEM }, ...chat],
//      stream: false,
//      options: { temperature: 0.9, num_ctx: 512 },
//    });
//
//    console.log(JSON.stringify(response));
//
//    return response.message.content;
//  }
//}

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
    const token = await this.getAuth();

    const data = JSON.stringify({
      model: 'GigaChat',
      messages: [{ role: 'system', content: MODEL_SYSTEM }, ...chat],
      stream: false,
      max_tokens: 512,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: data,
    };

    let message: string;
    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        message = response.data.choices[0].message;
      })
      .catch((error) => {
        throw new InternalServerErrorException(JSON.stringify(error));
      });
    return message;
  }

  private async getAuth(): Promise<string> {
    const expires = this.configService.get('GIGACHAT_EXPIERS');
    if (expires && new Date(expires - 1000) > new Date()) {
      return this.configService.get('GIGACHAT_TOKEN');
    }
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: 'Basic ' + this.configService.get('GIGACHAT_AUTH'),
      },
    };

    axios(config)
      .then((response) => {
        this.configService.set('GIGACHAT_TOKEN', response.data.access_token);
        this.configService.set('GIGACHAT_EXPIERS', response.data.expiers_at);
        return this.configService.get('GIGACHAT_TOKEN');
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
