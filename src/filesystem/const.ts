import {TemporaryDirectoryPath} from 'react-native-fs';
import {getParentPath, resolvePath} from './path';

export const TEMP_FOLDER = resolvePath(TemporaryDirectoryPath, 'temp');
export const STORAGES_FOLDER = resolvePath(
  getParentPath(resolvePath(Realm.defaultPath))!,
  'storage',
);
export const SYSTEM_STORAGE_FOLDER = resolvePath(STORAGES_FOLDER, 'system');

export const AUDIO_FOLDER_NAME = 'audio';
export const IMAGE_FOLDER_NAME = 'image';
export const DATABASE_FILE_NAME = 'database';
