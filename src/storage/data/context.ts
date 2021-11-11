import {createContext} from 'react';
import {DataStorage} from './data_storage';

export type DataStorageContextType = {
  dataStorage: DataStorage;
};

export const DataStorageContext = createContext<DataStorageContextType>({} as any);
