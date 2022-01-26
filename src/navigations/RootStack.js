import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
