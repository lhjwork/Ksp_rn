import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerComponent from '../components/DrawerComponent';
const Stack = createNativeStackNavigator();

export const DrawerStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="test"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {width: '73%'},
      }}
      drawerContent={props => <DrawerComponent />}></Stack.Navigator>
  );
};
