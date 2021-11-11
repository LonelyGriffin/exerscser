import React, {ComponentProps} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export const UITextInput = (props: ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      {...props}
      style={[style.root, props.style]}
      multiline
      placeholderTextColor={'rgba(0, 36, 90, 0.5)'}
    />
  );
};

const style = StyleSheet.create({
  root: {
    padding: 8,
    paddingTop: 7,
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#00245A',
    minHeight: 36,
    justifyContent: 'center',
  },
});
