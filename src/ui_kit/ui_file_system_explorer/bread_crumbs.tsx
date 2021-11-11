import React from 'react'
import {TouchableHighlight, View, Text, StyleSheet} from "react-native";

type Props = {
  path: string
  onPress?: (path: string) => void
}

export const BreadCrumbs = (props: Props) => {
  const {path, onPress} = props
  const items = path.slice(1, path.length).split('/')
  const onItemPress = (index: number) => {
    const to = '/' + items.slice(0, index + 1).join('/')
    onPress && onPress(to)
  }

  return (
    <View style={s.root}>
      {items.map((item, index) => (
        <View key={index}>
          <TouchableHighlight onPress={() => onItemPress(index)}>
            <View>
              <Text>{`/${item}`}</Text>
            </View>
          </TouchableHighlight>
        </View>
      ))}
    </View>

  )
}

const s = StyleSheet.create({
  root: {
    flexDirection: 'row'
  },
})
