import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ContainerGradient = ({childern, style}) => {
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      style={{...styles.containerGradient, ...style}}>
      {childern}
    </LinearGradient>
  );
};

export default ContainerGradient;

const styles = StyleSheet.create({
  containerGradient: {flex: 1, flexDirection: 'row', alignItems: 'center'},
});
