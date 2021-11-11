import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import {FlatList, View, ListRenderItemInfo} from 'react-native';

export type UIListProps<T> = {
  items: ReadonlyArray<T>;
  idExtractor: (item: T) => string;
  renderItem: (item: ListRenderItemInfo<T>, isSelected: boolean) => React.ReactNode;
  onLongPressItem?: (item: T) => void;
  onTapItem?: (item: T) => void;
  isSelectionMode?: boolean;
  selectedItems?: T[];
};

export function UIList<T>(props: UIListProps<T>) {
  const {
    items,
    onLongPressItem,
    onTapItem,
    isSelectionMode,
    idExtractor,
    renderItem,
  } = props;
  const selectedItems = props.selectedItems || [];

  const onPress = (item: T) => {
    onTapItem && onTapItem(item);
  };

  const onLongPress = (item: T) => {
    onLongPressItem && onLongPressItem(item);
  };

  return (
    <FlatList
      data={items}
      keyExtractor={idExtractor}
      renderItem={info => {
        const {item} = info;
        const id = idExtractor(item);
        const isSelected = Boolean(isSelectionMode && selectedItems.find(x => idExtractor(x) === id));
        return (
          <TouchableHighlight
            onPress={() => onPress(item)}
            onLongPress={() => onLongPress(item)}
          >
            <View style={s.item}>
              {renderItem(info, isSelected)}
            </View>
          </TouchableHighlight>
        );
      }}
    />
  );
}

const s = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 56, 140, 0.5)',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    backgroundColor: '#F2F2F2'
  },
});
