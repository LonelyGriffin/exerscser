import {Card} from './card';
import {LearnSession} from './learn_session';

export type AnswerResult = {
  id: string;
  timestamp: Date;
  order: number;
  code: number;
  learnSession: LearnSession;
  card: Card;
};
