import {TemporaryDirectoryPath} from 'react-native-fs';

export const TEMP_FOLDER = TemporaryDirectoryPath + '/temp';

const s = Realm.defaultPath.split('/');
export const DATABASE_FOLDER = s.slice(0, s.length - 1).join('/');

export const AUDIO_FOLDER = DATABASE_FOLDER + '/audio/';
export const IMAGE_FOLDER = DATABASE_FOLDER + '/image/';
