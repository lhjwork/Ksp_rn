import React, {useEffect} from 'react';
import {View, ImageBackground, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoldLabelSubTitle} from '../../components/Labels';
import {SCREEN_HEIGHT} from '../../constants';
import Touchable from '../../components/Touchable';

const Splash = ({navigation}) => {
  console.log('dd');
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('AuthStack');
    }, 1500);
  }, []);

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ImageBackground
        source={require('../../asssets/icons/ksp_logo.png')}
        style={styles.logo}></ImageBackground>
      <BoldLabelSubTitle
        text={'Kona Summit Platform'}
        style={{
          marginTop: 13,
          fontSize: 19,
          textAlign: 'center',
          marginHorizontal: 70,
          color: '#221E1F',
          fontWeight: '500',
        }}
      />
      {/* <Touchable onPress={movePage()}></Touchable> */}
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 125.5,
    marginTop: SCREEN_HEIGHT * 0.32,
    alignSelf: 'center',
  },
});
