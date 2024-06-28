import { last_message_coef } from 'src/constants';
import { Emotions } from 'src/modules/couchdb/types';

export function emotionsCalc(
  oldEmotions: Emotions,
  newEmotions: Emotions,
): Emotions {
  const emotions: Emotions = {
    anger: 0,
    sadness: 0,
    fear: 0,
    surprise: 0,
    joy: 0,
    neutral: 0,
    disgust: 0,
  };
  for (const emotion in emotions) {
    emotions[emotion] =
      (oldEmotions[emotion] * last_message_coef + newEmotions[emotion]) /
      (1 + last_message_coef);
  }
  return emotions;
}
