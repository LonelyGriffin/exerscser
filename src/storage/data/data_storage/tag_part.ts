import {ObjectSchema, UpdateMode} from 'realm';
import {Tag} from '../../../entity/tag';
import {Deck} from '../../../entity/deck';
import {DECK_SCHEMA} from './deck_part';

export class TagPart {
  constructor(private realm: Realm) {}

  getAll(): Readonly<Tag[]> {
    return this.realm.objects(TAG_SCHEMA.name);
  }

  getByQuery(query: string): Readonly<Tag[]> {
    return this.realm.objects(TAG_SCHEMA.name).filtered(query) as any as Readonly<Tag[]>;
  }

  async upsert(tag: Tag) {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.create(TAG_SCHEMA.name, tag, UpdateMode.Modified);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export const TAG_SCHEMA: ObjectSchema = {
  name: 'Tag',
  properties: {
    name: 'string',
    cards: {
      type: 'linkingObjects',
      objectType: 'Card',
      property: 'tags',
    },
  },
  primaryKey: 'name',
};
