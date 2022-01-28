import React from 'react';
import {View, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Touchable from '../../components/Touchable';

const ShoppingMall = ({navigation}) => {
  return (
    <View>
      <Touchable onPress={() => navigation.openDrawer()}>
        <Text>ShoppingMallScreen.js</Text>
      </Touchable>
    </View>
  );
};

export default ShoppingMall;
