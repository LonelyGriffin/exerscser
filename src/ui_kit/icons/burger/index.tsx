import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UIBurgerIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./burger.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 18,
  },
});
