import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UISmallBlueCloseIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./close.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 8,
    height: 8,
  },
});
