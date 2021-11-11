import {useContext} from 'react';
import {PortalContext, PortalsContext, PortalType} from './context';

export const usePortals = () => {
  return useContext(PortalsContext);
};

export const usePortal = <T>() => {
  return useContext<PortalType<T>>(PortalContext);
};
