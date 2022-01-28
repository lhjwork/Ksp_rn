import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCompnent from '../../components/HeaderCompnent';

const ShoppingMall = ({navigation}) => {
  return (
    <View>
      <HeaderCompnent />
    </View>
  );
};

export default ShoppingMall;
