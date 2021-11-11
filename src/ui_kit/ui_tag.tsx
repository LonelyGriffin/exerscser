import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {UISmallBlueCloseIcon} from './icons/small_blue_close';

type Props = {
  onPress?: (e: GestureResponderEvent) => void;
  text: string;
  left?: React.ReactNode;
};

export const UITag = (props: Props) => {
  return (
    <TouchableHighlight onPress={props.onPress} style={s.touchable}>
      <View style={s.root}>
        {props.left && <View style={s.left}>{props.left}</View>}
        <Text style={s.text}>{props.text}</Text>
        <UISmallBlueCloseIcon />
      </View>
    </TouchableHighlight>
  );
};

const s = StyleSheet.create({
  touchable: {
    borderRadius: 11,
  },
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 22,
    backgroundColor: '#DADFE5',
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 11,
  },
  left: {
    marginRight: 4,
  },
  text: {
    color: '#82A5D9',
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginRight: 4,
  },
});
