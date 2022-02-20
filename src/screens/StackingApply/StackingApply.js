import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';

const StackingApply = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent />
    </LinearGradient>
  );
};

export default StackingApply;
