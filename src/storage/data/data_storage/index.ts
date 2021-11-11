import {Path} from '../../../entity/path';
import {pathToRealmFilePath, resolvePath} from '../../../filesystem/path';
import {AUDIO_FOLDER_NAME, DATABASE_FILE_NAME, IMAGE_FOLDER_NAME, STORAGES_FOLDER} from '../../../filesystem/const';
import {makeDirIfNotExist} from '../../../filesystem/fs';
import {StorageDescriptor} from '../../../entity/storage_descriptor';
import {ANSWER_RESULT_SCHEMA, AnswerResultPart} from './answer_result_part';
import {AUDIO_SCHEMA, AudioPart} from './audio_part';
import {CARD_SCHEMA, CardPart} from './card_part';
import {DECK_SCHEMA, DeckPart} from './deck_part';
import {IMAGE_SCHEMA, ImagePart} from './image_part';
import {LEARN_SESSION_SCHEMA, LearnSessionPart} from './learn_session_part';
import {TAG_SCHEMA, TagPart} from './tag_part';

export class DataStorage {
  answerResult: AnswerResultPart;
  audio: AudioPart;
  card: CardPart;
  deck: DeckPart;
  image: ImagePart;
  learnSession: LearnSessionPart;
  tag: TagPart;

  constructor(private realm: Realm) {
    this.answerResult = new AnswerResultPart(realm);
    this.audio = new AudioPart(realm);
    this.card = new CardPart(realm);
    this.deck = new DeckPart(realm);
    this.image = new ImagePart(realm);
    this.learnSession = new LearnSessionPart(realm);
    this.tag = new TagPart(realm);
  }
  static async fromDataBaseFilePath(path: Path): Promise<DataStorage> {
    const {schema, schemaVersion} = getRealmSchema();

    const realm = await Realm.open({
      path: pathToRealmFilePath(path),
      schema,
      schemaVersion,
    });

    return new DataStorage(realm);
  }

  static async fromStorageDescriptor(descriptor: StorageDescriptor): Promise<DataStorage> {
    const dataStorageFolder = resolvePath(STORAGES_FOLDER, descriptor.uniqFolderName);
    const dataStorageFile = resolvePath(dataStorageFolder, DATABASE_FILE_NAME);

    await makeDirIfNotExist(dataStorageFolder);
    await makeDirIfNotExist(resolvePath(dataStorageFolder, AUDIO_FOLDER_NAME));
    await makeDirIfNotExist(resolvePath(dataStorageFolder, IMAGE_FOLDER_NAME));

    return await DataStorage.fromDataBaseFilePath(dataStorageFile);
  }
}

const getRealmSchema = () => {
  const VERSION = 1;
  const SCHEMAS = [ANSWER_RESULT_SCHEMA, AUDIO_SCHEMA, CARD_SCHEMA, DECK_SCHEMA, IMAGE_SCHEMA, LEARN_SESSION_SCHEMA, TAG_SCHEMA];

  return {
    schemaVersion: VERSION,
    schema: SCHEMAS,
  };
};
