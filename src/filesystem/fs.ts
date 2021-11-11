import {Path} from '../entity/path';
import * as RNFS from 'react-native-fs';

export const makeDirIfNotExist = async (path: Path) => {
  const isExist = await RNFS.exists(path);
  if (!isExist) {
    await RNFS.mkdir(path);
  }
};

export const clearDir = async (path: Path) => {
  const isExist = await RNFS.exists(path);
  if (isExist) {
    await RNFS.unlink(path);
  }
  await RNFS.mkdir(path);
};
