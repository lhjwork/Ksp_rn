import React, {useEffect} from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BoldLabelSubTitle} from '../../components/Labels';
import {SCREEN_HEIGHT} from '../../constants';
import Touchable from '../../components/Touchable';
import {useSelector} from 'react-redux';
import api from '../../api';

const Splash = ({navigation}) => {
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        routes: [
          {
            name: 'AuthStack',
          },
        ],
      });
    }, 1000);
  }, []);

  // useEffect(() => {
  //   getUserInfoList();
  // }, []);

  // const {sessionToken} = user;

  // const getUserInfoList = async () => {
  //   try {
  //     const config = {headers: {'Content-Type': 'application/json'}};
  //     const body = {sessionToken: sessionToken};
  //     const res = api.post('userinfosend', JSON.stringify(body), config);
  //     console.log('res', res);

  //     //  setUserInfoList(res?.data);
  //   } catch (e) {
  //     console.log(e);
  //     console.log(e.response);
  //   }

  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1, justifyContent: 'center'}}>
      <Image
        source={require('../../asssets/icons/ksp_logo.png')}
        style={styles.logo}
      />

      <Image
        style={styles.logoText}
        source={require('../../asssets/images/logoText.png')}
      />
      {/*<BoldLabelSubTitle*/}
      {/*  text={'Kona Summit Platform'}*/}
      {/*  style={{*/}
      {/*    marginTop: 13,*/}
      {/*    fontSize: 19,*/}
      {/*    textAlign: 'center',*/}
      {/*    marginHorizontal: 70,*/}
      {/*    color: '#221E1F',*/}
      {/*    fontWeight: '500',*/}
      {/*  }}*/}
      {/*/>*/}
      {/* <Touchable onPress={movePage()}></Touchable> */}
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  logo: {
    width: 98,
    height: 102,
    alignSelf: 'center',
  },
  logoText: {
    width: 236,
    height: 19,
    marginTop: 13,
    alignSelf: 'center',
  },
});
