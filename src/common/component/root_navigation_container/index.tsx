import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {SCREEN_NAME} from '../../../screen/screen_name';
import {DrawerContent} from '../drawer_content';
import {DrawerBurgerButton} from '../drawer_burger_button';
import {HomeScreen} from '../../../screen/home';
import {DeckScreen} from '../../../screen/decks';
import {CardsScreen} from '../../../screen/cards';
import {CreateSeriesOfCardsScreen} from '../../../screen/create_series_of_cards';
import {SettingsScreen} from '../../../screen/settings';
import {LearningScreen} from '../../../screen/learning';
import {RealmDebug} from '../../../screen/realm_debug';
import React from 'react';

const Drawer = createDrawerNavigator();

export const RootNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={SCREEN_NAME.Home}
        drawerContent={DrawerContent}
        screenOptions={{
          unmountOnBlur: true,
          headerStyle: {
            backgroundColor: '#00388C',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 29,
            color: '#ffffff',
            paddingLeft: 0,
            marginLeft: 0,
          },
          headerTitleAlign: 'left',
          headerLeft: DrawerBurgerButton,
        }}>
        <Drawer.Screen
          name={SCREEN_NAME.Home}
          component={HomeScreen}
          options={{
            title: 'Exerciser',
          }}
        />
        <Drawer.Screen name={SCREEN_NAME.Decks} component={DeckScreen} />
        {/*<Drawer.Screen name={SCREEN_NAME.Cards} component={CardsScreen} />*/}
        {/*<Drawer.Screen*/}
        {/*  name={SCREEN_NAME.CreateSeriesOfCards}*/}
        {/*  component={CreateSeriesOfCardsScreen}*/}
        {/*/>*/}
        {/*<Drawer.Screen name={SCREEN_NAME.Settings} component={SettingsScreen} />*/}
        {/*<Drawer.Screen name={SCREEN_NAME.Learning} component={LearningScreen} />*/}
        {/*<Drawer.Screen name={SCREEN_NAME.RealmDebug} component={RealmDebug} />*/}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
