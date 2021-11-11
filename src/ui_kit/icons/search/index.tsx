import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UISearchIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./search.png')} />
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
    width: 20,
    height: 20,
  },
});
