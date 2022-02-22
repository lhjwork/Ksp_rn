import React from 'react';

import Login from '../screens/Auth/Login/Login';
import SignUpAgree from '../screens/Auth/SignUp/SignUpAgree';
import SignUp from '../screens/Auth/SignUp/SignUp';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SelfAuth from '../screens/Auth/SignUp/SelfAuth/SelfAuth';
import SignUpComplete from '../screens/Auth/SignUp/SignUpComplete';

const Auth = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Auth.Navigator initialRouteName="Login">
      <Auth.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="SignUpAgree"
        component={SignUpAgree}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="SelfAuth"
        component={SelfAuth}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Auth.Screen
        name="SignUpComplete"
        component={SignUpComplete}
        options={{headerShown: false}}
      />
    </Auth.Navigator>
  );
};
