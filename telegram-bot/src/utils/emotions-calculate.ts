import { last_message_coef } from 'src/constants';
import { Emotions } from 'src/modules/couchdb/types';

export function emotionsCalc(
  oldEmotions: Emotions,
  newEmotions: Emotions,
): Emotions {
  let emotions: Emotions;
  for (const emotion in emotions) {
    emotions[emotion] =
      (oldEmotions[emotion] * last_message_coef + newEmotions[emotion]) /
      (1 + last_message_coef);
  }
  return emotions;
}
