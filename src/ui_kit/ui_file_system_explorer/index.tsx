import React, {useEffect, useState} from 'react';
import {readDir, ReadDirItem} from 'react-native-fs';
import {
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {DirectoryItem} from './directory_item';
import {BreadCrumbs} from './bread_crumbs';
import {FileItem} from './file_item';

type Props = {
  directoryPath: string;
  onChangeDirectory: (directoryPath: string) => void;
  mode?: 'view' | 'choose_file';
  itemsFilter?: (item: ReadDirItem) => boolean;
  chosenFiles?: string[];
  onToggleChooseFile?: (uri: string) => void;
};

export const UIFileSystemExplorer = (props: Props) => {
  const {
    directoryPath,
    onChangeDirectory,
    itemsFilter,
    mode,
    chosenFiles,
    onToggleChooseFile,
  } = props;
  const [items, setItems] = useState<ReadDirItem[]>([]);

  const filteredItems = itemsFilter ? items.filter(itemsFilter) : items;
  const itemsToRender = filteredItems.sort((a, b) => {
    if (a.isDirectory() !== b.isDirectory()) {
      return a.isDirectory() ? -1 : 1;
    }

    return a.name > b.name ? -1 : 1;
  });

  useEffect(() => {
    let canceled = false;

    (async () => {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] !==
          PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] !==
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return;
      }

      const newItems = await readDir(directoryPath);

      if (canceled) {
        return;
      }

      setItems(newItems);
    })();

    return () => {
      canceled = true;
    };
  }, [directoryPath]);

  return (
    <View style={s.root}>
      <BreadCrumbs path={directoryPath} onPress={onChangeDirectory} />
      <FlatList
        keyExtractor={item => item.path + '/' + item.name}
        data={itemsToRender}
        renderItem={({item}) => {
          return item.isFile() ? (
            <FileItem
              key={item.path}
              name={item.name}
              path={item.path}
              isChosen={
                mode === 'choose_file' &&
                chosenFiles !== undefined &&
                chosenFiles.includes(item.path)
              }
              onToggleChoose={onToggleChooseFile}
            />
          ) : (
            <DirectoryItem
              key={item.path}
              name={item.name}
              path={item.path}
              onPress={onChangeDirectory}
            />
          );
        }}
        style={s.view}
      />
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
});
