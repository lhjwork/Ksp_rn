import React from 'react';
import {StyleSheet, Platform, StatusBar, SafeAreaView} from 'react-native';

const SafeViewAndroid = ({children}) => {
  return <SafeAreaView style={styles.AndroidSafeArea}>{children}</SafeAreaView>;
};

export default SafeViewAndroid;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
