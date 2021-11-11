import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  searchText: string;
  onPress: () => void;
};

export const UISuggestion = (props: Props) => {
  return (
    <TouchableHighlight
      style={s.root}
      onPress={props.onPress}
      underlayColor={'#DAE4F4'}>
      <Text style={s.text}>{props.text}</Text>
    </TouchableHighlight>
  );
};

const s = StyleSheet.create({
  root: {
    padding: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#00245A',
  },
});
