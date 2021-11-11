import Rect, {useRef, useState} from 'react';
import {StatusBar, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import React from "react";
import {Measurement} from "./types";

type Props = {
  suggestions: React.ReactNode;
  measurement: Measurement;
  onClose: () => void;
  windowHeight: number;
}

export const UIAutocompleteSuggestions = (props: Props) => {
  const {suggestions, measurement, onClose, windowHeight} = props
  const suggestionsRef = useRef<View>(null);
  const [suggestionsHeight, setSuggestionsHeight] = useState(0);

  const statusBarHeight = StatusBar.currentHeight || 0;
  const direction: string = (windowHeight - statusBarHeight) <= measurement.y + suggestionsHeight
    ? 'up'
    : 'down'


  const suggestionsStyle = direction === 'down' ? {
    left: measurement.x,
    top: measurement.y,
    width: measurement.w,
    paddingTop: measurement.h,
    elevation: 3
  } : {
    left: measurement.x,
    bottom: windowHeight - statusBarHeight - measurement.h - measurement.y,
    width: measurement.w,
    paddingBottom: measurement.h,
    elevation: 3
  }

  const onLayout = () => {
    if (!suggestionsRef.current) {
      return
    }

    suggestionsRef.current.measureInWindow((x, y, w, h) => {
      setSuggestionsHeight(h);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
      <View style={s.root}>
        <View style={[s.suggestions, suggestionsStyle]} ref={suggestionsRef} onLayout={onLayout}>
          {suggestions}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const s = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  suggestions: {
    position: "absolute",
    backgroundColor: '#fff',
    borderRadius: 8,
  }
})
