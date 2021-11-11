import {ObjectSchema} from 'realm';
import {StorageDescriptor} from '../../../entity/storage_descriptor';

export class StoragesPart {
  constructor(private realm: Realm) {}

  async setStorage(storage: StorageDescriptor): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.create(STORAGE_SCHEMA.name, storage);
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export const STORAGE_SCHEMA: ObjectSchema = {
  name: 'Storage',
  properties: {
    uniqFolderName: 'string',
    name: 'string',
  },
  primaryKey: 'uniqFolderName',
};
