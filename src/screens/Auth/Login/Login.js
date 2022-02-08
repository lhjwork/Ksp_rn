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
const Login = () => {
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

            <RowView style={styles.idTextInput}>
              <Image
                source={require('../../../asssets/icons/Login/login_id_icon.png')}
                resizeMode="contain"
                style={{marginLeft: 16, marginRight: 12, width: 24, height: 24}}
              />
              <TextInput
                style={{
                  width: '100%',
                  height: 50,
                }}
                placeholder="아이디"
                value={id}
                onChange={text => setId(text)}
              />
            </RowView>
            <RowView style={styles.idTextInput2}>
              <RowView>
                <Image
                  source={require('../../../asssets/icons/Login/login_password_icon.png')}
                  resizeMode="contain"
                  style={{
                    marginLeft: 16,
                    marginRight: 12,
                    width: 24,
                    height: 24,
                  }}
                />
                <TextInput
                  style={{
                    width: '73%',
                    height: 50,
                  }}
                  placeholder="비밀번호"
                  value={password}
                  onChange={text => setPassword(text)}
                  autoCapitalize="none"
                  textContentType="password"
                  autoCorrect={false}
                  secureTextEntry={passwordVisible ? false : true}
                  // onBlur={() => Keyboard.dismiss()}
                />
              </RowView>

              <Touchable
                style={{marginRight: 100}}
                onPress={() => visiblePassword()}>
                <Image
                  source={
                    passwordVisible
                      ? require('../../../asssets/icons/Login/password_open.png')
                      : require('../../../asssets/icons/Login/passwrord_hide.png')
                  }
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </Touchable>
            </RowView>
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
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
