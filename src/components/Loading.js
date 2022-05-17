import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function Loading() {
  const {container} = styles;
  return <View style={container}></View>;
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loading;
