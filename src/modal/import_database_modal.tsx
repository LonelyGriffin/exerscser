import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import React, {useCallback, useState} from 'react';
import {UITransparentButton} from '../ui_kit/ui_transparent_button';
import {useRealm} from '../realm';
import {usePortal} from '../common/component/portals/hook';
import * as RNFS from 'react-native-fs';
import {UIFileSystemExplorer} from '../ui_kit/ui_file_system_explorer';
import {FULL_MODAL_MIN_TOP_OFFSET} from './constants';
import {AUDIO_FOLDER, IMAGE_FOLDER, TEMP_FOLDER} from '../common/files/const';
import shortid from 'shortid';
import {Audio, Card, Image, SCHEMA, SCHEMA_VERSION, Tag} from '../realm/schema';
import {ImageFile} from '../common/files/image_file';
import {AudioFile} from '../common/files/audio_file';
import {unzip} from 'react-native-zip-archive';

const ImportDatabaseModalBody = (props: UIModalChildrenProps<void>) => {
  const {realm, open: openRealm} = useRealm();
  const {close} = usePortal();

  const [chosenFilenames, setChosenFilenames] = useState<string[]>([]);
  const [directoryPath, setDirectoryPath] = useState(
    RNFS.DownloadDirectoryPath,
  );

  const onOk = async () => {
    const zipUri = chosenFilenames[0];
    if (!realm || !zipUri) {
      return;
    }

    // unzip to temp folder
    const tempFolder = `${TEMP_FOLDER}/${shortid()}`;
    await unzip(zipUri, tempFolder);
    // export db
    const importingRealm = await Realm.open({
      path: `${tempFolder}/database`,
      schema: SCHEMA,
      schemaVersion: SCHEMA_VERSION,
    });
    const cardPromises = importingRealm.objects<Card>('Card').map(
      card =>
        new Promise(resolve => {
          const existCard = realm.objectForPrimaryKey<Card>('Card', card.id);
          realm.write(async () => {
            if (existCard !== undefined) {
              // merge card
              // TODO
            } else {
              // add card

              // реалм до асинк операций так как иначе реалм операции выпадц из realm.write(async () => {
              realm.create<Card>('Card', card);
              await syncImage(realm, card);
              await syncAudio(realm, card);
            }
            resolve();
          });
        }),
    );
    await Promise.all(cardPromises);

    // clean up
    RNFS.unlink(tempFolder);

    close(undefined);
  };

  const onToggleChooseFile = useCallback(
    (uri: string) => {
      if (!uri.endsWith('.zip')) {
        return;
      }

      if (uri === chosenFilenames[0]) {
        setChosenFilenames([]);
      } else {
        setChosenFilenames([uri]);
      }
    },
    [chosenFilenames],
  );

  return (
    <>
      <UiModalHeader
        title={'Exporting'}
        right={
          <UITransparentButton
            text={'Ok'}
            onPress={onOk}
            disabled={!(chosenFilenames.length > 0 && directoryPath)}
          />
        }
      />
      <UIFileSystemExplorer
        mode={'choose_file'}
        directoryPath={directoryPath}
        onChangeDirectory={setDirectoryPath}
        chosenFiles={chosenFilenames}
        onToggleChooseFile={onToggleChooseFile}
      />
    </>
  );
};

export const ImportDatabaseModal = () => {
  return (
    <UIModal topOffset={FULL_MODAL_MIN_TOP_OFFSET}>
      {modalProps => <ImportDatabaseModalBody {...modalProps} />}
    </UIModal>
  );
};

const syncImage = async (realm: Realm, card: Card) => {
  const image = card.image;
  if (!image) {
    return;
  }

  const existImage = realm.objectForPrimaryKey('Image', image.id);
  const fileIsExist = await RNFS.existsRes(IMAGE_FOLDER + image.filename);

  if (!fileIsExist || !existImage) {
    const imageFile = ImageFile.fromRealmImage(image);
    await imageFile.saveToRealm(realm);
  }
};

const syncAudio = async (realm: Realm, card: Card) => {
  const audio = card.audio;
  if (!audio) {
    return;
  }

  const existImage = realm.objectForPrimaryKey('Audio', audio.id);
  const fileIsExist = await RNFS.existsRes(AUDIO_FOLDER + audio.filename);

  if (!fileIsExist || !existImage) {
    const audioFile = AudioFile.fromRealmAudio(audio);
    await audioFile.saveToRealm(realm);
  }
};
