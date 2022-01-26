import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerComponent from '../components/DrawerComponent';
import {View, Text} from 'react-native';

const Stack = createNativeStackNavigator();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ShoppingMall"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '73%',
          drawerInactiveBackgroundColor: 'rgba(0,0,0,0.45)',
        },
      }}
      drawerContent={props => <DrawerComponent />}></Stack.Navigator>
  );
};
