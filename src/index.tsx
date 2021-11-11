import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {PortalsProvider} from './common/component/portals/portals_provider';
import {RootNavigationContainer} from './common/component/root_navigation_container';
import {Text} from 'react-native';
import {SystemStorageContext, SystemStorageContextType} from './storage/system/context';
import {SystemStorage} from './storage/system/system_storage';
import {SYSTEM_STORAGE_FOLDER, TEMP_FOLDER} from './filesystem/const';
import {clearDir} from './filesystem/fs';
import {DataStorage} from './storage/data/data_storage';
import {DataStorageContext, DataStorageContextType} from './storage/data/context';
import {SplashScreen} from './screen/SplashScreen';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [systemStorageContext, setSystemStorageContext] = useState<SystemStorageContextType>();
  const [dataStorageContext, setDataStorageContext] = useState<DataStorageContextType>();

  useEffect(() => {
    (async () => {
      const [{systemStorage, dataStorage}] = await Promise.all([initializeApp(), waitFor(2000)]);

      setSystemStorageContext({systemStorage});
      setDataStorageContext({dataStorage});
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <SystemStorageContext.Provider value={systemStorageContext!}>
      <DataStorageContext.Provider value={dataStorageContext!}>
        <PortalsProvider>
          <RootNavigationContainer />
        </PortalsProvider>
      </DataStorageContext.Provider>
    </SystemStorageContext.Provider>
  );
};

export default App;

const initializeApp = async () => {
  await clearDir(TEMP_FOLDER);
  const systemStorage = await SystemStorage.fromFolder(SYSTEM_STORAGE_FOLDER);
  await systemStorage.initialize();
  const dataStorageDescriptor = await systemStorage.getCurrentDataStorageDescriptor();
  const dataStorage = await DataStorage.fromStorageDescriptor(dataStorageDescriptor);

  return {systemStorage, dataStorage};
};

const waitFor = async (time: number) => new Promise(resolve => setTimeout(resolve, time));
