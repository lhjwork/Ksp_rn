import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from '../screens/Main';
import BottomTabs from './BottomTabs';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
