import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

type Props = {
  name: string;
  path: string;
  isChosen?: boolean;
  onToggleChoose?: (path: string) => void;
};

export const FileItem = (props: Props) => {
  const {name, path, onToggleChoose, isChosen} = props;
  return (
    <TouchableHighlight onPress={() => onToggleChoose && onToggleChoose(path)}>
      <View>
        <Text style={{color: isChosen ? 'red' : 'blue'}}>{name}</Text>
      </View>
    </TouchableHighlight>
  );
};
