import React from 'react';
import {UIModal, UIModalChildrenProps} from '../common/component/ui_modal';
import {Button, Text} from 'react-native';
import {useCallback} from 'react';
import {useRealm} from '../realm';
import {UiModalHeader} from '../ui_kit/ui_modal_header';
import * as RNFS from 'react-native-fs';
import {initFileSystem} from '../common/files/init_file_system';
import {AUDIO_FOLDER, IMAGE_FOLDER} from '../common/files/const';

type OuterProps = {};

const ClearDatabaseModalBody = (props: UIModalChildrenProps<void>) => {
  const {close} = props;
  const {realm} = useRealm();

  const onOk = useCallback(async () => {
    realm?.write(() => {
      realm?.deleteAll();
    });
    await RNFS.unlink(AUDIO_FOLDER);
    await RNFS.unlink(IMAGE_FOLDER);
    await initFileSystem();
    close();
  }, [realm, close]);

  return (
    <>
      <UiModalHeader
        title={'Clear all'}
        right={<Button title="Clear" onPress={onOk} />}
      />
      <Text>Clear all data base</Text>
    </>
  );
};

export const ClearDatabaseModal = (props: OuterProps) => {
  return (
    <UIModal height={100}>
      {modalProps => <ClearDatabaseModalBody {...modalProps} />}
    </UIModal>
  );
};
