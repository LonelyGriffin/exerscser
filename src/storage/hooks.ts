import {useContext} from 'react';
import {DataStorageContext} from './data/context';

export const useDataStorage = () => useContext(DataStorageContext).dataStorage;
