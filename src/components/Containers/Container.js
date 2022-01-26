import React from 'react';
import {View, StyleSheet} from 'react-native';
export const Container = ({childern, style}) => {
  return <View style={{...styles.container, ...style}}>{childern}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
