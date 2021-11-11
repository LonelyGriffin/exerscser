import {omit} from 'lodash-es';
import React, {ComponentProps} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = ComponentProps<typeof TouchableOpacity> & {
  text?: string;
};

export const UITransparentButton = (props: Props) => {
  const touchableHighlightProps = omit(props, 'text');
  return (
    <TouchableOpacity {...touchableHighlightProps} style={s.root}>
      <Text style={[s.text, props.disabled ? s.disabledText : undefined]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  root: {
    padding: 8,
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#0E008C',
  },
  disabledText: {
    color: '#82A5D9',
  },
});
