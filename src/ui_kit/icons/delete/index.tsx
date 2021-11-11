import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UIDeleteIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./delete.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 16,
    height: 16,
  },
});
