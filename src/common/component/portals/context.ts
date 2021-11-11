import React, {createContext} from 'react';

export type OpenPortalMethodType = <T, P>(
  component: React.ComponentType<P>,
  initialProps: P,
  zIndex?: number,
) => {
  result: Promise<T>;
  rerender: (props: P) => void;
  close: () => void;
};

export type OpenPortalMethodResultType<T, P> = {
  result: Promise<T>;
  rerender: (props: P) => void;
  close: () => void;
};

export type PortalType<T> = {
  id: string;
  component: React.ReactNode;
  zIndex: number;
  close: (result: T) => void;
};

export type PortalsContextType = {
  openPortal: OpenPortalMethodType;
};

export const PortalsContext = createContext<PortalsContextType>({} as any);
export const PortalContext = createContext<PortalType<any>>({} as any);
