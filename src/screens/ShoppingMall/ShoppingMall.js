import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';

const ShoppingMall = ({navigation}) => {
  return (
    <View>
      <HeaderCompnent />
    </View>
  );
};

export default ShoppingMall;
