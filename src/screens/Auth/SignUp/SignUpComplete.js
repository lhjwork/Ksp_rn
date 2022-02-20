import React from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import {SCREEN_HEIGHT} from '../../../constants';
import {LabelNone, BoldLabelTitle} from '../../../components/Labels';
import {BottomButton} from '../../../components/Buttons/Buttons';

const SignUpComplete = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ContainerStyled>
        <Image
          source={require('../../../asssets/icons/white_logo.png')}
          style={styles.logo}
        />
        <LabelNone text={'Kona Summit Platform'} style={styles.logoText} />
        <BoldLabelTitle
          text={'반갑습니다!\n회원가입이 성공적으로\n완료되었습니다.'}
          style={styles.subText}
        />
      </ContainerStyled>
      <Image
        source={require('../../../asssets/images/signUp_complete_img.png')}
        style={{flex: 1, marginTop: 50}}
        resizeMode="contain"
      />
      <View style={styles.box}>
        <BottomButton
          style={styles.bottomBtn}
          text={'로그인하러 가기'}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </LinearGradient>
  );
};

export default SignUpComplete;

const styles = StyleSheet.create({
  box: {marginHorizontal: 24},
  bottomBtn: {position: 'absolute', top: -80},
  subText: {textAlign: 'center', color: '#fff'},
  logo: {
    width: 62,
    height: 64.86,
    alignSelf: 'center',
    marginTop: SCREEN_HEIGHT * 0.11,
  },
  logoText: {
    color: '#fff',
    fontSize: 17.8,
    textAlign: 'center',
    marginTop: 10.81,
    marginBottom: SCREEN_HEIGHT * 0.11,
  },
});
