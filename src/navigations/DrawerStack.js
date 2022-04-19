import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationContainer} from '@react-navigation/native';

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
import {SCREEN_WIDTH} from '../constants';
import ScannHistory from '../screens/ScannHistory/ScannHistory';
import PasswordChange from '../screens/PasswordChange/PasswordChange';
import SearchId from '../screens/SearchId/SearchId';
import NotificationDetail from '../screens/Notification/NotificationDetail';
import TermsDetail from '../screens/Terms/TermsDetail';
import DeliveryTracking from '../screens/deliveryTracking';
import PurchaseHistory from '../screens/purchaseHistory';
import DetailPurchaseHistory from '../screens/detailPurchaseHistory';
import {useDrawerStatus} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const DrawerStack = ({props}) => {
  return (
    <Drawer.Navigator
      initialRouteName="BottomTabs"
      // drawerPosition="left"
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: '85%',
          position: 'absolute',
          left: SCREEN_WIDTH * 0.16,
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
        name="NotificationDetail"
        component={NotificationDetail}
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
      <Drawer.Screen
        name="ScannHistory"
        component={ScannHistory}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="passwordChange"
        component={PasswordChange}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="TermsDetail"
        component={TermsDetail}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="DeliveryTracking"
        component={DeliveryTracking}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="PurchaseHistory"
        component={PurchaseHistory}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="DetailPurchaseHistory"
        component={DetailPurchaseHistory}
        options={{headerShown: false}}
      />
      {/*PurchaseHistory*/}
    </Drawer.Navigator>
  );
};
