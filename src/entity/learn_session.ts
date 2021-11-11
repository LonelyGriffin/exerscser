import {Card} from './card';
import {AnswerResult} from './answer_result';

export type LearnSession = {
  id: string;
  beginDate: Date;
  toLearnCards: Card[];
  answerResults: AnswerResult[];
};
