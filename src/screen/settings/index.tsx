import React from 'react';
import {Text, SafeAreaView, Button} from 'react-native';
import {usePortals} from '../../common/component/portals/hook';
import {ExportDatabaseModal} from '../../modal/export_database_modal';
import {ClearDatabaseModal} from '../../modal/clear_database_modal';
import {ImportDatabaseModal} from '../../modal/import_database_modal';

export const SettingsScreen = () => {
  const {openPortal} = usePortals();

  const exportDataBase = () => openPortal(ExportDatabaseModal, {});
  const importDataBase = () => openPortal(ImportDatabaseModal, {});
  const clearDataBase = () => openPortal(ClearDatabaseModal, {});

  return (
    <SafeAreaView>
      <Text>SettingsScreen</Text>
      <Button title={'export data base'} onPress={exportDataBase} />
      <Button title={'import data base'} onPress={importDataBase} />
      <Button title={'clear data base'} onPress={clearDataBase} />
    </SafeAreaView>
  );
};
