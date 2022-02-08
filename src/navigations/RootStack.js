import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import Main from '../screens/Main';
import BottomTabs from './BottomTabs';
import {DrawerStack} from './DrawerStack';
import Login from '../screens/Auth/Login/Login';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
