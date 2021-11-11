import {ObjectSchema} from 'realm';

export class LearnSessionPart {
  constructor(private realm: Realm) {}
}

export const LEARN_SESSION_SCHEMA: ObjectSchema = {
  name: 'LearnSession',
  properties: {
    id: 'string',
    beginDate: 'date',
    toLearnCards: 'Card[]',
    answerResults: 'AnswerResult[]',
  },
  primaryKey: 'id',
};
