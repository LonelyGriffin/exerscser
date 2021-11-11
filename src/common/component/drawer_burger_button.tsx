import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import {UIBurgerIcon} from '../../ui_kit/icons/burger';

export const DrawerBurgerButton = () => {
  const navigation = useNavigation();

  const onBurgerPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={s.root}>
      <TouchableOpacity onPress={onBurgerPress}>
        <UIBurgerIcon />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  root: {
    marginLeft: 16,
    marginRight: 0,
  },
});
