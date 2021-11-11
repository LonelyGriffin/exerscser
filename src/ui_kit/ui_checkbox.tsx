import React from 'react';
import {StyleSheet, View} from "react-native";
import {UICheckIcon} from "./icons/check";

type Props = {
  value: boolean
}

export const UICheckbox = (props: Props) => {
  const {value} = props

  return (
    <View style={s.root}>
      {value && (
        <UICheckIcon />
      )}
    </View>
  )
}

const s = StyleSheet.create({
  root: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DADFE5',
    justifyContent: 'center',
    alignItems: 'center'
  },
})
