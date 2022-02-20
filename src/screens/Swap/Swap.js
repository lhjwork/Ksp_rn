import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Swap = () => {
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      style={{flex: 1}}></LinearGradient>
  );
};

export default Swap;
