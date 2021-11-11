import {noop} from 'lodash-es';
import React, {useCallback} from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {PropsWithChildren} from 'react';
import {StyleSheet, TouchableWithoutFeedback, Animated} from 'react-native';
import {usePortal} from './portals/hook';

type UIModalClose<T> = (data: T | undefined) => void;

export type UIModalChildrenProps<T = any> = {
  close: UIModalClose<T>;
};

type Props = {
  topOffset?: number;
  height?: number;
  children: (props: UIModalChildrenProps) => React.ReactNode;
};

export const UIModal = (props: PropsWithChildren<Props>) => {
  const {close} = usePortal();
  const closeAnimationPercent = useRef(new Animated.Value(1)).current;

  const animatedClose = useCallback(
    (data: any) => {
      Animated.timing(closeAnimationPercent, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        close(data);
      });
    },
    [closeAnimationPercent, close],
  );

  useEffect(
    () =>
      Animated.timing(closeAnimationPercent, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(),
    [closeAnimationPercent],
  );

  return (
    <TouchableWithoutFeedback onPress={() => animatedClose(undefined)}>
      <Animated.View
        style={[
          s.root,
          {
            opacity: closeAnimationPercent.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}>
        <TouchableWithoutFeedback onPress={noop}>
          <Animated.View
            style={[
              s.content,
              {
                top: props.topOffset,
                height: props.height,
                transform: [
                  {
                    translateY: closeAnimationPercent.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 5000],
                    }),
                  },
                ],
              },
            ]}>
            {props.children({close: animatedClose})}
          </Animated.View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'column',
  },
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
