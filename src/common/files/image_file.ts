import {File} from './file';
import RNFS from 'react-native-fs';
import {IMAGE_FOLDER} from './const';
import {Image} from '../../entity/image';
import {genUUID} from '../uuid';

export class ImageFile extends File {
  constructor(readonly width: number, readonly height: number, uri: string, readonly id?: string) {
    super(uri);
  }

  async saveToRealm(realm: Realm) {
    if (!this.isTemp()) {
      return;
    }

    const name = (await RNFS.hash(this.uri, 'md5')) + '.' + this.getExt();
    const dataBaseUri = ImageFile.getDataBaseUri(name);
    await RNFS.moveFile(this.uri, dataBaseUri);
    return new Promise(resolve => {
      const img: Image = {
        id: genUUID(),
        height: this.height,
        width: this.width,
        filename: name,
      };
      realm.write(() => {
        realm.create<Image>('Image', img);
        this.uri = dataBaseUri;
        resolve();
      });
    });
  }

  toRealmImage(): Image {
    return {
      id: this.id || shortid(),
      height: this.height,
      width: this.width,
      filename: this.getName(),
    };
  }

  static fromRealmImage(img: Image) {
    return new ImageFile(img.width, img.height, ImageFile.getDataBaseUri(img.filename));
  }

  static getDataBaseUri(filename: string) {
    return 'file://' + IMAGE_FOLDER + filename;
  }
}
