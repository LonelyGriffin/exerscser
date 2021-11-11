import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

export const UISettingsDarkBlueIcon = () => {
  return (
    <View style={s.root}>
      <Image style={s.image} source={require('./settings_dark_blue.png')} />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
});
