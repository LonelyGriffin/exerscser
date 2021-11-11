import React from 'react';
import {View, StyleSheet} from 'react-native';
export const Separator = () => {
  return (
    <View style={s.root}>
      <View style={s.line} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: '100%',
    height: 1,
    paddingLeft: 16,
  },
  line: {
    flex: 1,
    backgroundColor: '#809CC6',
  },
});
