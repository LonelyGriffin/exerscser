import {ObjectSchema, UpdateMode} from 'realm';
import {Deck} from '../../../entity/deck';
import {Tag} from '../../../entity/tag';
import {TAG_SCHEMA} from './tag_part';

export class DeckPart {
  constructor(private realm: Realm) {}
  getAll(): Readonly<Deck[]> {
    return this.realm.objects(DECK_SCHEMA.name);
  }

  async upsert(deck: Deck) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.create(DECK_SCHEMA.name, deck, UpdateMode.Modified);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async remove(deck: Deck | Deck[]) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.delete(deck);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  getByQuery(query: string): Readonly<Deck[]> {
    return this.realm.objects(DECK_SCHEMA.name).filtered(query) as any as Readonly<Tag[]>;
  }
}

export const DECK_SCHEMA: ObjectSchema = {
  name: 'Deck',
  properties: {
    name: 'string',
    cards: {
      type: 'linkingObjects',
      objectType: 'Card',
      property: 'decks',
    },
  },
  primaryKey: 'name',
};
