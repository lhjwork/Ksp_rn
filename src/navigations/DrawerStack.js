import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DrawerComponent from '../components/DrawerComponent';
import {View, Text} from 'react-native';
import ShoppingMall from '../screens/ShoppingMall/ShoppingMall';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="ShoppingMall"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '73%',
          drawerInactiveBackgroundColor: 'rgba(0,0,0,0.45)',
        },
      }}
      drawerContent={props => <DrawerComponent />}>
      <Drawer.Screen
        name="ShoppingMall"
        component={ShoppingMall}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};
