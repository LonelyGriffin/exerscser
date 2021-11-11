import {File} from "./file";
import RNFS from "react-native-fs"
import shortid from "shortid";
import {AUDIO_FOLDER} from "./const";
import {Audio, Image} from "../../realm/schema";

export class AudioFile extends File {
  constructor(
    readonly duration: number,
    uri: string,
    readonly id?: string
  ) {
    super(uri)
  }

  async saveToRealm(realm: Realm) {
    if (!this.isTemp()) {
      return
    }
    const name = await RNFS.hash(this.uri, 'md5') + '.' + this.getExt()
    const dataBaseUri = AudioFile.getDataBaseUri(name)
    await RNFS.moveFile(this.uri, dataBaseUri)

    return new Promise((resolve) => {
      const audio: Audio = {
        id: shortid(),
        duration: this.duration,
        filename: name
      }
      realm.write(() => {
        realm.create<Audio>('Audio', audio)
        this.uri = dataBaseUri
        resolve()
      })
    })
  }

  toRealmAudio(): Audio {
    return {
      id: this.id || shortid(),
      duration: this.duration,
      filename: this.getName()
    }
  }

  static fromRealmAudio(audio: Audio) {
    return new AudioFile(
      audio.duration,
      AudioFile.getDataBaseUri(audio.filename)
    )
  }

  static getDataBaseUri(filename: string) {
    return AUDIO_FOLDER + filename
  }
}
