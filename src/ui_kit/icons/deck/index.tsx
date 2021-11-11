import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UIDeckIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./deck.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 12.6,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 12.6,
    height: 12,
  },
});
