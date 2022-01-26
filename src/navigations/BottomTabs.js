import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Scann from '../screens/Scann/Scann';
import WalletKsp from '../screens/WalletKsp/WalletKsp';
import Swap from '../screens/Swap/Swap';
import ShoppingMall from '../screens/ShoppingMall/ShoppingMall';
import {View, Text} from 'react-native';
import {TitleInput} from '../components/TxInput';
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <View>
            <Text style={{color: 'red'}}>dddd</Text>
          </View>
        ),
      }}>
      <Tab.Screen
        name="ShoppingMall"
        component={ShoppingMall}
        options={{title: ''}}
      />
      <Tab.Screen
        name="Scann"
        component={Scann}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="WalletKsp"
        component={WalletKsp}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Swap" component={Swap} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
