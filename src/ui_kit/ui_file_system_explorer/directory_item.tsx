import React from 'react'
import {TouchableHighlight, View, Text} from "react-native";

type Props = {
  name: string
  path: string
  onPress?: (path: string) => void
}

export const DirectoryItem = (props: Props) => {
  const {name, path, onPress} = props
  return (
    <TouchableHighlight onPress={() => onPress && onPress(path)}>
      <View>
        <Text>{`D: ${name}`}</Text>
      </View>
    </TouchableHighlight>
  )
}
