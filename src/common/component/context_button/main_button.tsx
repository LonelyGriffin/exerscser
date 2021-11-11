import React from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {TouchableHighlight, StyleSheet, View, Text, Animated} from 'react-native';
import {UIPlusIcon} from '../../../ui_kit/icons/plus';

type ContextButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};

type Props = {
  isExpanded: boolean;
  expandable: boolean;
  onClick?: () => void;
  expandedButtons: ContextButtonProps[];
};

export const MainContextButton = (props: Props) => {
  const {isExpanded, expandedButtons} = props;
  const animatedExpandPercent = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedExpandPercent, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const onMainButtonClick = useCallback(() => {
    props.onClick && props.onClick();
  }, [props]);

  return (
    <View style={s.root}>
      <Animated.View
        style={[
          s.buttons,
          {
            transform: [
              {
                translateY: animatedExpandPercent.interpolate({
                  inputRange: [0, 1],
                  outputRange: [BUTTONS_HEIGHT, 0],
                }),
              },
            ],
          },
        ]}>
        {expandedButtons.map((button, i) => (
          <TouchableHighlight key={i} onPress={button.onClick} style={s.button}>
            <>
              <View style={s.buttonIcon}>{button.icon}</View>
              <Text style={s.buttonText}>{button.text}</Text>
            </>
          </TouchableHighlight>
        ))}
      </Animated.View>
      <TouchableHighlight onPress={onMainButtonClick} style={[s.mainButton]} underlayColor={'#00388C'}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: animatedExpandPercent.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '45deg'],
                }),
              },
              {
                scale: animatedExpandPercent.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.5],
                }),
              },
            ],
          }}>
          <UIPlusIcon />
        </Animated.View>
      </TouchableHighlight>
    </View>
  );
};

const BUTTONS_HEIGHT = 80;

const s = StyleSheet.create({
  root: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  mainButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: '#00388C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: BUTTONS_HEIGHT,
    paddingRight: 72,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#00388C',
    flexDirection: 'row',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    height: BUTTONS_HEIGHT,
    width: 64,
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonIcon: {
    marginTop: 16,
    height: 32,
    width: 32,
    backgroundColor: '#DADFE5',
    borderRadius: 32 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
});
