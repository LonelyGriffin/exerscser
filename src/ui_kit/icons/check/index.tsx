import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UICheckIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./check.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 39 / 4,
    height: 58 / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 39 / 4,
    height: 58 / 4,
  },
});
