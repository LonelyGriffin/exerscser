import {useFocusEffect} from '@react-navigation/native';
import {ComponentProps, useCallback, useEffect} from 'react';
import {useContextButton} from './hook';
import {MainContextButton} from './main_button';

type ContextButtonProps = ComponentProps<typeof MainContextButton>;

export const ContextButtonOnScreen = (props: ContextButtonProps) => {
  const {mountContextButton, updateProps} = useContextButton(props);

  useEffect(() => updateProps(props), [props]);

  useFocusEffect(useCallback(mountContextButton, []));

  return null;
};

export const ContextButtonOnModal = (props: ContextButtonProps) => {
  const {mountContextButton, updateProps} = useContextButton(props);

  useEffect(() => updateProps(props), [props]);

  useEffect(mountContextButton, []);

  return null;
};
