import {APP_STATE_SCHEMA, AppStatePart} from './app_state_part';
import {Path} from '../../../entity/path';
import {makeDirIfNotExist} from '../../../filesystem/fs';
import {DATABASE_FILE_NAME} from '../../../filesystem/const';
import {pathToRealmFilePath, resolvePath} from '../../../filesystem/path';
import {STORAGE_SCHEMA, StoragesPart} from './storages_part';
import {StorageDescriptor} from '../../../entity/storage_descriptor';
import Realm from 'realm';

export class SystemStorage {
  readonly appState: AppStatePart;
  readonly storages: StoragesPart;
  constructor(private realm: Realm) {
    this.appState = new AppStatePart(realm);
    this.storages = new StoragesPart(realm);
  }

  async initialize(): Promise<void> {
    await this.appState.initialize();
  }

  async getCurrentDataStorageDescriptor(): Promise<StorageDescriptor> {
    const appState = await this.appState.getState();
    return appState.currentDataStorage;
  }

  static async fromFolder(path: Path): Promise<SystemStorage> {
    const {schema, schemaVersion} = getRealmSchema();
    const systemStorageFilePath = resolvePath(path, DATABASE_FILE_NAME);

    await makeDirIfNotExist(path);

    const realm = await Realm.open({
      path: pathToRealmFilePath(systemStorageFilePath),
      schema,
      schemaVersion,
    });

    return new SystemStorage(realm);
  }
}

const getRealmSchema = () => {
  const VERSION = 1;
  const SCHEMAS = [APP_STATE_SCHEMA, STORAGE_SCHEMA];

  return {
    schemaVersion: VERSION,
    schema: SCHEMAS,
  };
};
