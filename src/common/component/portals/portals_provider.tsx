import sortBy from 'lodash-es/sortBy';
import React, {useCallback, useEffect, useState} from 'react';
import {PropsWithChildren} from 'react';
import {useForceUpdate} from '../../hook/use_force_update';
import {PortalType, PortalsContext, OpenPortalMethodType, PortalContext} from './context';
import {genUUID} from '../../uuid';

export const PortalsProvider = (props: PropsWithChildren<any>) => {
  const forceUpdate = useForceUpdate();
  const [state] = useState<{portals: PortalType<any>[]}>({portals: []});

  const setPortals = useCallback((portals: PortalType<any>[]) => {
    state.portals = portals;
    forceUpdate();
  }, []);

  const closePortal = useCallback(
    (id: string) => {
      setPortals(state.portals.filter(portal => portal.id !== id));
    },
    [state],
  );
  const openPortal = useCallback(
    function <P>(component: React.ComponentClass<P>, initialProps: P, zIndex?: number) {
      const id = genUUID();
      let rerenderCallback = (_: P) => {};
      return {
        close: () => closePortal(id),
        rerender: (p: P) => {
          rerenderCallback(p);
        },
        result: new Promise(resolve => {
          const newPortal = {
            component: (
              <UpdateablePortalComponent
                initialProps={initialProps}
                component={component}
                subscribeOnUpdateProps={update => {
                  rerenderCallback = update;
                }}
              />
            ),
            zIndex: zIndex !== undefined ? zIndex : sortBy(state.portals, ['zIndex'])[0]?.zIndex || 0,
            id,
            close: (data: any) => {
              closePortal(newPortal.id);
              resolve(data);
            },
          };

          setPortals([...state.portals, newPortal]);
        }),
      };
    },
    [state],
  );

  return (
    <PortalsContext.Provider
      value={{
        openPortal: openPortal as OpenPortalMethodType,
      }}>
      {props.children}
      {sortBy(state.portals, ['zIndex']).map(portal => (
        <PortalContext.Provider value={portal} key={portal.id}>
          {portal.component}
        </PortalContext.Provider>
      ))}
    </PortalsContext.Provider>
  );
};

type SubscribeOnUpdateProps<P> = (cb: (props: P) => void) => void;

// hack for force rerender with new props
const UpdateablePortalComponent = function <P>(props: {
  initialProps: P;
  subscribeOnUpdateProps: SubscribeOnUpdateProps<P>;
  component: React.ComponentClass<P>;
}) {
  const [currentProps, setCurrentProps] = useState(props.initialProps);

  useEffect(() => {
    props.subscribeOnUpdateProps(setCurrentProps);
  }, []);

  return <props.component {...currentProps} />;
};
