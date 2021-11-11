import RNFS from 'react-native-fs';
import {AUDIO_FOLDER, IMAGE_FOLDER, TEMP_FOLDER} from './const';

export const initFileSystem = async () => {
  if (!(await RNFS.existsRes(AUDIO_FOLDER))) {
    await RNFS.mkdir(AUDIO_FOLDER);
  }
  if (!(await RNFS.existsRes(IMAGE_FOLDER))) {
    await RNFS.mkdir(IMAGE_FOLDER);
  }

  if (await RNFS.existsRes(TEMP_FOLDER)) {
    await RNFS.unlink(TEMP_FOLDER);
    await RNFS.mkdir(TEMP_FOLDER);
  }
};
