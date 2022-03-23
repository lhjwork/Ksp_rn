import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import Main from '../screens/Main';
import BottomTabs from './BottomTabs';
import {DrawerStack} from './DrawerStack';
import Login from '../screens/Auth/Login/Login';
import Splash from '../screens/Splash/Splash';
import SignUp from '../screens/Auth/SignUp/SignUp';
import SignUpAgree from '../screens/Auth/SignUp/SignUpAgree';
import {AuthStack} from './AuthStack';
import TermsDetail from '../screens/Terms/TermsDetail';
import ShoppingWebView from '../screens/ShoppingWebView';
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AuthStack"
        component={AuthStack}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpAgree"
        component={SignUpAgree}
        options={{headerShown: false}}
      /> */}

      <Stack.Screen
        name="DrawerStack"
        component={DrawerStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShoppingWebView"
        component={ShoppingWebView}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="TermsDetail"
        component={TermsDetail}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
