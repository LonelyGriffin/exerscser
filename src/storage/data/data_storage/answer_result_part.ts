import {ObjectSchema} from 'realm';

export class AnswerResultPart {
  constructor(private realm: Realm) {}
}

export const ANSWER_RESULT_SCHEMA: ObjectSchema = {
  name: 'AnswerResult',
  properties: {
    id: 'string',
    timestamp: 'date',
    code: 'int',
    learnSession: 'LearnSession',
    card: 'Card',
  },
  primaryKey: 'id',
};
