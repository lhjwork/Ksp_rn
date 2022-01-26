import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Main from '../screens/Main';
import Scann from '../screens/Scann/Scann';
import WalletKsp from '../screens/WalletKsp/WalletKsp';
import Swap from '../screens/Swap/Swap';
import ShoppingMall from '../screens/ShoppingMall/ShoppingMall';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TitleInput} from '../components/TxInput';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const TabBarIcon = ({isFocus, focusImage, unFocusImage}) => {
    return (
      // <Image source={isFocus ? focusImage : unFocusImage} style={styles.icon} />
      <Image source={focusImage} style={styles.icon} resizeMode="contain" />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#94D2E9',
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
        options={{
          title: '',
          tabBarLabel: '쇼핑몰',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focusImage={require('../asssets/icons/shop_bottom_icon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scann"
        component={Scann}
        options={{
          title: '',
          tabBarLabel: '스캔',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focusImage={require('../asssets/icons/scan_bttom_icon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="WalletKsp"
        component={WalletKsp}
        options={{
          title: '',
          tabBarLabel: 'Ksp지갑',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focusImage={require('../asssets/icons/wallet_bottom_icon.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Swap"
        component={Swap}
        options={{
          title: '',
          tabBarLabel: '스왑',
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focusImage={require('../asssets/icons/swap_bottom_icon.png')}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});
