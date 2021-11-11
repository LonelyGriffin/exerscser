import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UIEmptyCardListIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./empty_card_list.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
  },
});
