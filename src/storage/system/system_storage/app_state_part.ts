import {AppState} from '../../../entity/app_state';
import {StorageDescriptor} from '../../../entity/storage_descriptor';

const PRIMARY_KEY = 0;

export class AppStatePart {
  constructor(private realm: Realm) {}

  async initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const state = this.realm.objectForPrimaryKey<AppState>(APP_STATE_SCHEMA.name, PRIMARY_KEY);
        if (!state) {
          this.realm.write(() => {
            const defaultStorage: StorageDescriptor = {
              name: 'Default',
              uniqFolderName: 'default',
            };
            this.realm.create(APP_STATE_SCHEMA.name, {
              id: PRIMARY_KEY,
              currentDataStorage: defaultStorage,
            });
            resolve();
          });
        }

        resolve();
      } catch (e) {
        reject(e);
      }
    });
  }

  async getState(): Promise<AppState> {
    return this.realm.objectForPrimaryKey<AppState>(APP_STATE_SCHEMA.name, PRIMARY_KEY)!;
  }
  async setState(value: AppState): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.realm.write(() => {
          this.realm.create(APP_STATE_SCHEMA.name, {
            id: PRIMARY_KEY,
            ...value,
          });
          resolve();
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export const APP_STATE_SCHEMA = {
  name: 'AppState',
  properties: {
    id: 'int',
    currentDataStorage: 'Storage',
  },
  primaryKey: 'id',
};
