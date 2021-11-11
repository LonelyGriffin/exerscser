import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Card} from '../../realm/schema';
import {UICheckIcon} from '../icons/check';

type Props = {
  card: Card;
};

export const UIProgressCircle = (props: Props) => {
  const {card} = props;
  const level = Math.floor(card.knowledgeLevel);

  switch (level) {
    case 0:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_0.png')} />
        </View>
      );
    case 1:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_1.png')} />
        </View>
      );
    case 2:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_2.png')} />
        </View>
      );
    case 3:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_3.png')} />
        </View>
      );
    case 4:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_4.png')} />
        </View>
      );
    case 5:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_5.png')} />
        </View>
      );
    case 6:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_6.png')} />
        </View>
      );
    case 7:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_7.png')} />
        </View>
      );
    case 8:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_8.png')} />
        </View>
      );
    case 9:
      return (
        <View style={s.root}>
          <Image style={s.progressImage} source={require('./progress_9.png')} />
        </View>
      );
    case 10:
      return (
        <View style={s.root}>
          <UICheckIcon />
        </View>
      );
    default:
      return null;
  }
};

const s = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressImage: {
    height: 24,
    width: 24,
  },
});
