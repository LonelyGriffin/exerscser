import React, {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

export const UIPage = ({children}: PropsWithChildren<React.ReactNode>) => {
  return <SafeAreaView style={style.root}>{children}</SafeAreaView>;
};

const style = StyleSheet.create({
  root: {
    marginTop: 16,
    marginBottom: 16,
  },
});
