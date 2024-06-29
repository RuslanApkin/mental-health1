import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Emotions } from 'src/modules/couchdb/types';

export async function getEmotions(text: string): Promise<Emotions> {
  const configService = new ConfigService();
  const url = configService.get('EMOTIONS_URL');
  const requestBody = {
    text,
  };
  const response = await axios.post(url, requestBody);
  const emotions = response.data;

  const userEmotions: Emotions = {
    anger: 0,
    sadness: 0,
    fear: 0,
    surprise: 0,
    joy: 0,
    neutral: 0,
    disgust: 0,
  };

  emotions[0].forEach((emotion: { label: string; score: number }) => {
    switch (emotion.label) {
      case 'anger':
        userEmotions.anger = emotion.score;
        break;
      case 'sadness':
        userEmotions.sadness = emotion.score;
        break;
      case 'fear':
        userEmotions.fear = emotion.score;
        break;
      case 'surprise':
        userEmotions.surprise = emotion.score;
        break;
      case 'joy':
        userEmotions.joy = emotion.score;
        break;
      case 'neutral':
        userEmotions.neutral = emotion.score;
        break;
      case 'disgust':
        userEmotions.disgust = emotion.score;
        break;
      default:
        break;
    }
  });
  return userEmotions;
}
