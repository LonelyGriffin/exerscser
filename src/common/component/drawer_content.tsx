import React from 'react';
import {StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {SCREEN_NAME} from "../../screen/screen_name";
import {UIAddCardBlueIcon} from "../../ui_kit/icons/add_card_blue";
import {UIDeckBlueIcon} from "../../ui_kit/icons/deck_blue";
import {UIAddCardDarkBlueIcon} from "../../ui_kit/icons/add_card_dark_blue";
import {UIDeckDarkBlueIcon} from "../../ui_kit/icons/deck_dark_blue";
import {UICardListBlueIcon} from "../../ui_kit/icons/card_list_blue";
import {UICardListDarkBlueIcon} from "../../ui_kit/icons/card_list_dark_blue";
import {UISettingsBlueIcon} from "../../ui_kit/icons/settings_blue";
import {UISettingsDarkBlueIcon} from "../../ui_kit/icons/settings_dark_blue";
import {UIHomeBlueIcon} from "../../ui_kit/icons/home_blue";
import {UIHomeDarkBlueIcon} from "../../ui_kit/icons/home_dark_blue";

const EXCLUDE_ROUTES = [
  SCREEN_NAME.Learning
]

export const DrawerContent = (props: DrawerContentComponentProps) => {
  const routes = props.state.routes;
  const activeName = props.state.routeNames[props.state.index]

  const items = routes.filter(route => !EXCLUDE_ROUTES.includes(route.name))

  const mapRouteToDescriptor = (route: typeof items[0]): RouteDescription | undefined => {
    switch (route.name) {
      case SCREEN_NAME.Home: return {
        label: 'Home',
        Icon: {
          idle: UIHomeBlueIcon,
          selected: UIHomeDarkBlueIcon
        }
      }
      case SCREEN_NAME.CreateSeriesOfCards: return {
        label: 'Create cards',
        Icon: {
          selected: UIAddCardDarkBlueIcon,
          idle: UIAddCardBlueIcon
        }
      }
      case SCREEN_NAME.Decks: return {
        label: 'Decs',
        Icon: {
          selected: UIDeckDarkBlueIcon,
          idle: UIDeckBlueIcon
        }
      }
      case SCREEN_NAME.Cards: return {
        label: 'Cards',
        Icon: {
          idle: UICardListBlueIcon,
          selected: UICardListDarkBlueIcon
        }
      }
      case SCREEN_NAME.Settings: return {
        label: 'Settings',
        Icon: {
          idle: UISettingsBlueIcon,
          selected: UISettingsDarkBlueIcon
        }
      }
      case SCREEN_NAME.RealmDebug: return {
        label: 'RealmDebug',
      }
      default: return undefined
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={s.root}>
        {items.map(route => {
          const descriptor = mapRouteToDescriptor(route)

          if (!descriptor) {
            return null
          }

          const isSelected = activeName === route.name
          const Icon = isSelected ? descriptor.Icon?.selected : descriptor.Icon?.idle

          return (
            <TouchableOpacity key={route.key} onPress={() => props.navigation.navigate(route)}>
              <View style={s.item}>
                {Icon && <View style={s.icon}><Icon /></View>}
                <View style={s.itemBody}>
                  <View style={s.titleContainer}>
                    <Text style={[s.title, isSelected && s.selectedTitle]}>
                      {descriptor.label}
                    </Text>
                  </View>
                  <View style={[s.separator, isSelected && s.selectedSeparator]} />
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </DrawerContentScrollView>
  );
}


const s = StyleSheet.create({
  root: {
    paddingTop: 24,
    flex: 1,
    paddingLeft: 32,
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    height: 34 + 16,
    paddingLeft: 40,
    paddingBottom: 16,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 4,

  },
  itemBody: {

  },
  separator: {

    height: 1,
    backgroundColor: '#82A5D9'
  },
  selectedSeparator: {
    backgroundColor: '#00245A'
  },
  titleContainer: {

  },
  title: {
    fontSize: 16,
    color: '#82A5D9',
    fontFamily: 'Poppins'
  },
  selectedTitle: {
    color: '#00245A'
  }
})

type RouteDescription = {
  label: string,
  Icon?: {
    selected: React.ComponentType
    idle: React.ComponentType
  }
}
