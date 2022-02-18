import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContainerGradient from '../../../components/Containers/ContainerGradient';
import HeaderCompnent from '../../../components/HeaderCompnent';

const SignUpAgree = () => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent rightView={false} />
    </LinearGradient>
  );
};

export default SignUpAgree;
