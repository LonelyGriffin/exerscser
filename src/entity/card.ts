import {Image} from './image';
import {Tag} from './tag';
import {Deck} from './deck';
import {AnswerResult} from './answer_result';
import {Audio} from './audio';

export type Card = {
  id: string;
  type: 'simple';
  tags: Tag[];
  decks: Deck[];
  answerResults: AnswerResult[];
  question: string;
  answer: string;
  created: Date;
  lastAnswerDate?: Date;
  knowledgeLevel: number;
  image?: Image;
  audio?: Audio;
};
