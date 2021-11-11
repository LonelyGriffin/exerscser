import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UITagIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./tag.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 12,
    height: 12,
  },
});
