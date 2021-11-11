import {UIModal, UIModalChildrenProps} from "../common/component/ui_modal";
import {UiModalHeader} from "../ui_kit/ui_modal_header";
import React, {useState} from "react";
import {UITransparentButton} from "../ui_kit/ui_transparent_button";
import {UITextInput} from "../ui_kit/ui_text_input";
import {useRealm} from "../realm";
import {usePortal} from "../common/component/portals/hook";
import * as RNFS from "react-native-fs";
import {UIFileSystemExplorer} from "../ui_kit/ui_file_system_explorer";
import {FULL_MODAL_MIN_TOP_OFFSET} from "./constants";
import {TEMP_FOLDER} from "../common/files/const";
import shortid from "shortid";
import {Audio, Image} from "../realm/schema";
import {ImageFile} from "../common/files/image_file";
import {AudioFile} from "../common/files/audio_file";
import {zip} from 'react-native-zip-archive'

const ExportDatabaseModalBody = (props: UIModalChildrenProps<void>) => {
  const {realm, open: openRealm} = useRealm()
  const {close} = usePortal()

  const [filename, setFilename] = useState("");
  const [directoryPath, setDirectoryPath] = useState(RNFS.DownloadDirectoryPath);

  const onOk = async () => {
    if (!realm) {
      return
    }

    // prepare temp folder
    const tempFolder = `${TEMP_FOLDER}/${shortid()}`
    await RNFS.mkdir(tempFolder)
    await RNFS.mkdir(`${tempFolder}/audio`)
    await RNFS.mkdir(`${tempFolder}/image`)
    // files copy to temp folder
    const copyImagePromises = realm.objects<Image>('Image').map(image => {
      const file = ImageFile.fromRealmImage(image)
      return RNFS.copyFile(file.getUri(), `${tempFolder}/image/${file.getName()}`)
    })
    const copyAudioPromises = realm.objects<Audio>('Audio').map(audio => {
      const file = AudioFile.fromRealmAudio(audio)
      return RNFS.copyFile(file.getUri(), `${tempFolder}/audio/${file.getName()}`)
    })
    await Promise.all([...copyImagePromises, ...copyAudioPromises])
    // database copy to temp folder
    await realm.close()
    await RNFS.copyFile(realm.path, `${tempFolder}/database`)
    await openRealm(true)
    // zip temp folder
    const destination = `${directoryPath}/${filename}.zip`
    await zip(tempFolder, destination)
    // clean up
    await RNFS.unlink(tempFolder)

    close(undefined);
  }

  return (
    <>
      <UiModalHeader
        title={'Exporting'}
        right={
          <UITransparentButton
            text={"Save"}
            onPress={onOk}
            disabled={!(filename && directoryPath)}
          />
        }
      />
      <UITextInput placeholder={"File name"} value={filename} onChangeText={setFilename} />
      <UIFileSystemExplorer directoryPath={directoryPath} onChangeDirectory={setDirectoryPath}/>
    </>
  )
}

export const ExportDatabaseModal = () => {
  return (
    <UIModal topOffset={FULL_MODAL_MIN_TOP_OFFSET}>
      {modalProps => <ExportDatabaseModalBody {...modalProps} />}
    </UIModal>
  )
}
