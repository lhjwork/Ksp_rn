import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  keyboard,
  Keyboard,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {LabelNone} from '../../../components/Labels';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import {Container} from '../../../components/Containers/Container';

import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../constants';
import RowView from '../../../components/Views/RowView';
import {ScrollView} from 'react-native-gesture-handler';
const Login = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  validate = () => {
    const {password} = this.state;
    console.log('validate passeword 16 line', password);
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
              <Image
                source={require('../../../asssets/icons/Login/login_password_icon.png')}
                resizeMode="contain"
                style={{marginLeft: 16, marginRight: 12, width: 24, height: 24}}
              />
              <TextInput
                style={{
                  width: '100%',
                  height: 50,
                }}
                placeholder="비밀번호"
                value={password}
                onChange={text => setPassword(text)}
                autoCapitalize="none"
                textContentType="password"
                autoCorrect={false}
                secureTextEntry={true}
                // onBlur={() => Keyboard.dismiss()}
              />
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
