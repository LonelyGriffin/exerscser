import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type Props<Tag> = {
  tags: Tag[];
  text: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  renderTag: (tag: Tag) => React.ReactNode;
  tagIdExtractor: (tag: Tag) => string;
  containerRef?: React.Ref<View>;
  inputRef?: React.Ref<TextInput>;
  onLayout?: () => void;
  autoFocus?: boolean;
};

export function UIAutocompleteInput<Tag>(props: Props<Tag>) {
  const {
    tags,
    renderTag,
    tagIdExtractor,
    text,
    onChangeText,
    onFocus,
    onBlur,
    placeholder,
    containerRef,
    inputRef,
    onLayout,
    autoFocus,
  } = props;

  return (
    <View ref={containerRef} style={s.root} onLayout={onLayout}>
      {tags.map(tag => (
        <View key={tagIdExtractor(tag)} style={s.tag}>
          {renderTag(tag)}
        </View>
      ))}
      <TextInput
        autoFocus={autoFocus}
        ref={inputRef}
        style={s.input}
        onChangeText={onChangeText}
        value={text}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor="'rgba(0, 36, 90, 0.5)'"
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 4,
    paddingTop: 8,
    paddingBottom: 0,
    backgroundColor: '#F4F5F7',
    borderRadius: 8,
  },
  tag: {
    marginBottom: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#00245A',
    minWidth: 40,
    marginTop: -12,
    marginBottom: -4,
  },
});
