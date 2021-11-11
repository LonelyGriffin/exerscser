import {omit} from 'lodash-es';
import React, {ComponentProps} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = ComponentProps<typeof TouchableOpacity> & {
  text?: string;
};

export const UIBlueButton = (props: Props) => {
  const touchableHighlightProps = omit(props, 'text');
  return (
    <TouchableOpacity {...touchableHighlightProps} style={s.root}>
      <View style={[s.body, props.disabled ? s.body : undefined]}>
        <Text style={[s.text, props.disabled ? s.disabledText : undefined]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  root: {
    padding: 8,
  },
  body: {
    backgroundColor: '#00388C',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabledBody: {
    backgroundColor: '#DADFE5',
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 16,
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#82A5D9',
  },
});
