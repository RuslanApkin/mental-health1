export interface User {
  chatId: number;
  emotions: Emotions;
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
