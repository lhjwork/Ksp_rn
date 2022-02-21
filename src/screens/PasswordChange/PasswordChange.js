import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PasswordChange = () => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <Text>비밀번호 변경</Text>
    </LinearGradient>
  );
};

export default PasswordChange;
