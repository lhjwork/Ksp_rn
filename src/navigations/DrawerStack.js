import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DrawerComponent from '../components/DrawerComponent';
import {View, Text, Image} from 'react-native';
import ShoppingMall from '../screens/ShoppingMall/ShoppingMall';
import Touchable from '../components/Touchable';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Scann from '../screens/Scann/Scann';
import WalletKsp from '../screens/WalletKsp/WalletKsp';
import BottomTabs from './BottomTabs';
import Myinfo from '../screens/MyInfo/Myinfo';
import Calendar from '../screens/Calendar/Calendar';
import Notification from '../screens/Notification/Notification';
import Terms from '../screens/Terms/Terms';
import KspSend from '../screens/KspSend/KspSend';
import EtherSend from '../screens/EtherSend/EtherSend';
import StackingApply from '../screens/StackingApply/StackingApply';

const Drawer = createDrawerNavigator();

export const DrawerStack = ({navigation}) => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '73%',
          drawerInactiveBackgroundColor: 'rgba(0,0,0,0.45)',
        },
      }}
      drawerContent={props => <DrawerComponent {...props} />}>
      <Drawer.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyInfo"
        component={Myinfo}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="KspSend"
        component={KspSend}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="EtherSend"
        component={EtherSend}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="StackingApply"
        component={StackingApply}
        options={{headerShown: false}}
      />
      {/* <Drawer.Screen
        name="WalletKsp"
        component={WalletKsp}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      /> */}
    </Drawer.Navigator>
  );
};
