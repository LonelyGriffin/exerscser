import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  title?: string;
  right?: React.ReactNode;
};

export const UiModalHeader = (props: Props) => {
  const {title, right} = props;

  return (
    <View style={s.root}>
      <Text style={s.title}>{title}</Text>
      <View>{right}</View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    height: 64,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#00245A',
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 25,
  },
});
