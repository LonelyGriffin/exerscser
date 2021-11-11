import React from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {Card} from '../../realm/schema';
import {QuestionView} from './question_view';
import {UIBlueButton} from '../../ui_kit/ui_blue_button';

type Props = {
  card: Card;
  onNext?: () => void;
};

export const QuestionScreen = (props: Props) => {
  const {onNext, card} = props;

  return (
    <View style={s.root}>
      <QuestionView card={card} />
      <View style={s.clearFix} />
      <View style={s.bottom}>
        <UIBlueButton text={'Next'} onPress={() => onNext && onNext()} />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    paddingTop: 32,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'column',
  },
  clearFix: {
    flex: 1,
  },
  bottom: {
    width: '100%',
    paddingRight: 16,
    paddingLeft: 16,
  },
});
