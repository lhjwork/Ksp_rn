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
            <ContentInput />
            <PasswordInput />
          </View>
          <RowView>
            <LabelNone text={'아이디 찾기'} />
            <AntDesign name={'right'} size={14} />
          </RowView>
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
