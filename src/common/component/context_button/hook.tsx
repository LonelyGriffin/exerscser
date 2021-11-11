import {ComponentProps} from 'react';
import {useRef} from 'react';
import {useCallback} from 'react';
import {usePortals} from '../portals/hook';
import {MainContextButton} from './main_button';

type ContextButtonProps = ComponentProps<typeof MainContextButton>;

export const useContextButton = (props: ContextButtonProps) => {
  const {openPortal} = usePortals();

  const updateRef = useRef<(props: ContextButtonProps) => void>();

  const mountContextButton = useCallback(() => {
    const result = openPortal(MainContextButton, props);

    updateRef.current = result.rerender;
    return result.close;
  }, []);

  const updateProps = useCallback((props: ContextButtonProps) => {
    if (updateRef.current) {
      updateRef.current(props);
    }
  }, []);

  return {mountContextButton, updateProps};
};
