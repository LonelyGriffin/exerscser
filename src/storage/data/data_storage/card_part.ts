import {ObjectSchema} from 'realm';
import {Card} from '../../../entity/card';

export class CardPart {
  constructor(private realm: Realm) {}

  getAll(): Readonly<Card[]> {
    return this.realm.objects(CARD_SCHEMA.name);
  }

  async remove(card: Card | Card[]) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.delete(card);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export const CARD_SCHEMA: ObjectSchema = {
  name: 'Card',
  properties: {
    id: 'string',
    type: 'string',
    tags: 'Tag[]',
    decks: 'Deck[]',
    answerResults: 'AnswerResult[]',
    knowledgeLevel: 'float', // 0 - не изучали, 1 - через час, 2 - сегодня, 3 - завтра, 4 - через день, 5 - в течении семи дней, 6 - через неделю, 7 - через две недели, 8 - через месяц, 9 - через два месяца, 10 - через пол года
    lastAnswerDate: 'date?',
    question: 'string',
    answer: 'string',
    created: 'date',
    image: 'Image?',
    audio: 'Audio?',
  },
  primaryKey: 'id',
};
