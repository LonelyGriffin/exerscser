import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';

type Props = {
  text: string;
  style?: TextStyle;
};

export const UITitle = (props: Props) => {
  return <Text style={[s.root, props.style]}>{props.text}</Text>;
};

const s = StyleSheet.create({
  root: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 19,
    color: '#00245A',
  },
});
