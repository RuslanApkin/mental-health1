import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    console.log(JSON.stringify(chat));

    const response = await this.ollama.chat({
      model: this.configService.get('MODEL'),
      messages: [{ role: 'system', content: MODEL_SYSTEM }, ...chat],
      stream: false,
      options: { temperature: 0.9, num_ctx: 512 },
    });

    console.log(JSON.stringify(response));

    return response.message.content;
  }
}
