import {TemporaryDirectoryPath} from "react-native-fs";
import {TEMP_FOLDER} from "./const";

export class File {
  constructor(
    protected uri: string
  ) {}

  isTemp() {
    return this.uri.includes(TEMP_FOLDER)
  }

  getName() {
    const s = this.uri.split('/')
    return s[s.length - 1]
  }

  getExt() {
    const s = this.getName().split('.')
    return s[s.length - 1]
  }

  getUri() {
    return this.uri
  }
}
