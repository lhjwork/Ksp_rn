import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TextInput, keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LabelNone} from '../../../components/Labels';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import {Container} from '../../../components/Containers/Container';
import Touchable from '../../../components/Touchable';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import RowView from '../../../components/Views/RowView';
import {ScrollView} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ContentInput, PasswordInput} from '../../../components/TxInput';
import {BottomButton} from '../../../components/Buttons/Buttons';
const Login = ({navigation}) => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(true);

  const visiblePassword = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <ContainerStyled>
          <View style={{marginHorizontal: 30}}>
            <Image
              source={require('../../../asssets/icons/white_logo.png')}
              style={styles.logo}
            />
            <LabelNone text={'Kona Summit Platform'} style={styles.logoText} />
            <ContentInput
              placeholder={'아이디'}
              source={require('../../../asssets/icons/Login/login_id_icon.png')}
            />
            <PasswordInput />
            <RowView style={styles.searchAndRePassword}>
              <Touchable>
                <RowView>
                  <LabelNone text={'아이디 찾기'} style={styles.searchText} />
                  <AntDesign name={'right'} size={14} style={styles.leftIcon} />
                </RowView>
              </Touchable>

              <Touchable>
                <RowView>
                  <LabelNone
                    text={'비밀번호재설정'}
                    style={styles.searchText}
                  />
                  <AntDesign name={'right'} size={14} style={styles.leftIcon} />
                </RowView>
              </Touchable>
            </RowView>
            <RowView style={styles.signUpBox}>
              <LabelNone
                text={'아직 회원이 아니신가요?'}
                style={styles.signUpText}
              />
              <Touchable onPress={() => navigation.navigate('SignUpAgree')}>
                <LabelNone text={'회원가입 하러가기'} style={styles.signup} />
              </Touchable>
            </RowView>
            <BottomButton
              style={styles.bottomBtn}
              text={'로그인'}
              onPress={() => navigation.navigate('DrawerStack')}
            />
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  bottomBtn: {marginTop: 10},
  signUpText: {fontWeight: '700', color: '#555555', fontWeight: '400'},
  signUpBox: {justifyContent: 'center', marginTop: 56},
  signup: {
    color: '#46A0BD',
    borderBottomWidth: 1,
    borderBottomColor: '#46A0BD',
    marginLeft: 7,
    fontWeight: '700',
  },
  leftIcon: {color: '#fff', fontWeight: '700', marginLeft: 10.52},
  searchText: {color: '#fff', fontWeight: '700', fontSize: 13},
  searchAndRePassword: {
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 8,
  },
  idTextInput2: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  idTextInput: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
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
