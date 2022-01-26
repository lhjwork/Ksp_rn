import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Scann from '../screens/Scann/Scann';
import WalletKsp from '../screens/WalletKsp/WalletKsp';
import Swap from '../screens/Swap/Swap';
import ShoppingMall from '../screens/ShoppingMall/ShoppingMall';
import {View, Text, Image} from 'react-native';
import {TitleInput} from '../components/TxInput';
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          shadowOffset: {height: 0, width: 0},
          backgroundColor: 'linear-gradient(180deg, #91C7D6 0%, #CBE2DC 100%)',
        },
        headerLeft: () => (
          <View>
            <Text>dddd</Text>
          </View>
        ),
        headerRight: () => (
          <>
            <Image
              source={require('../asssets/icons/headerRight_more.png')}
              resizeMode="contain"
              style={{width: 30, height: 30}}
            />
          </>
        ),
      }}>
      <Tab.Screen
        name="ShoppingMall"
        component={ShoppingMall}
        options={{title: ''}}
      />
      <Tab.Screen name="Scann" component={Scann} options={{title: ''}} />
      <Tab.Screen
        name="WalletKsp"
        component={WalletKsp}
        options={{title: ''}}
      />
      <Tab.Screen name="Swap" component={Swap} options={{htitle: ''}} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
