import {SystemStorage} from './system_storage';
import {createContext} from 'react';

export type SystemStorageContextType = {
  systemStorage: SystemStorage;
};

export const SystemStorageContext = createContext<SystemStorageContextType>(
  {} as any,
);
