import React from 'react';
import {Measurement, Props} from './types';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {UIAutocompleteInput} from './input';
import {UIAutocompleteSuggestions} from "./suggestions";

export type UIAutocompletePortalProps<Tag> = {
  measurement: Measurement;
  autocompleteProps: Props<Tag>;
  onClose: () => void;
  windowHeight: number;
};

export function UIAutocompletePortal<Tag>(
  props: UIAutocompletePortalProps<Tag>,
) {
  const {measurement, autocompleteProps, onClose, windowHeight} = props;
  const {tags, text, onChangeText, renderTag, tagIdExtractor, suggestions, suggestionsOpened} = autocompleteProps;
  const placeholder = tags.length > 0 ? '' : autocompleteProps.placeholder

  const inputStyle = {
    left: measurement.x,
    top: measurement.y,
    width: measurement.w
  }

  return (
    <View style={s.root} pointerEvents={'box-none'}>
      {suggestionsOpened && (
        <UIAutocompleteSuggestions
          suggestions={suggestions}
          measurement={measurement}
          onClose={onClose}
          windowHeight={windowHeight}
        />
      )}
      <View style={[s.input, inputStyle]}>
        <UIAutocompleteInput
          onBlur={() => onClose()}
          placeholder={placeholder}
          autoFocus
          tags={tags}
          text={text}
          onChangeText={onChangeText}
          renderTag={renderTag}
          tagIdExtractor={tagIdExtractor}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  input: {
    position: "absolute",
    elevation: 3
  }
})
