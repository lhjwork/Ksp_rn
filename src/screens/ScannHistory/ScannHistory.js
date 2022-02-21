import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ScannHistory = () => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <Text>스캔히스토리</Text>
    </LinearGradient>
  );
};

export default ScannHistory;
