import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import ContainerGradient from '../../components/Containers/ContainerGradient';

const ShoppingMall = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />
    </LinearGradient>
  );
};

export default ShoppingMall;
