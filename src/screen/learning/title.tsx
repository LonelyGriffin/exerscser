import React from 'react';
import {StyleSheet, Text} from 'react-native';

type Props = {
  text: string;
};

export const Title = (props: Props) => {
  return <Text style={s.root}>{props.text}</Text>;
};

const s = StyleSheet.create({
  root: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 29,
    color: '#00245A',
  },
});
