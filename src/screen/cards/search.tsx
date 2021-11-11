import React from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {UISearchIcon} from '../../ui_kit/icons/search';
import {UICloseIcon} from '../../ui_kit/icons/close';
import {UIAutocomplete} from '../../ui_kit/ui_autocomplete';
import {Card, Tag} from '../../realm/schema';

export type SearchQuery =
  | {
      type: 'text';
      text: string;
    }
  | {
      type: 'tag';
      tag: Tag;
    }
  | {
      type: 'card';
      card: Card;
    };

export const ScreenSearch = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [queries, setQueries] = useState<SearchQuery[]>([]);

  const onPress = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded, setIsExpanded]);

  return (
    <View style={isExpanded ? s.expandedRoot : s.root}>
      <TouchableOpacity onPress={onPress}>
        {isExpanded ? <UICloseIcon /> : <UISearchIcon />}
      </TouchableOpacity>
      {/*{isExpanded && (*/}
      {/*  <UIAutocomplete*/}
      {/*    tags={queries}*/}
      {/*    suggestionExtractor={(tag: Tag) => tag.name}*/}
      {/*    onChangeTags={onChange}*/}
      {/*    onAddNewTag={onAddNewTag}*/}
      {/*    filterSuggestions={filterSuggestions}*/}
      {/*  />*/}
      {/*)}*/}
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    position: 'relative',
    paddingRight: 8,
  },
  expandedRoot: {
    position: 'absolute',
    backgroundColor: '#00388C',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 8,
    paddingLeft: 8,
  },
});
