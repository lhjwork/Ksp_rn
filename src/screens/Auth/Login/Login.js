import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  keyboard,
  StatusBar,
  SafeAreaView,
} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {signIn, saveUserInfo} from '../../../redux/authSlice';
import ModalFrame from '../../../components/Modals/ModalFrame';
import api from '../../../api';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {user} = auth;

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loginIdModalVisible, setLoginModalVisible] = useState(false);
  const [pwdModalVisible, setPwdModalVisible] = useState(false);

  useEffect(() => {
    // dispatch(signOut());
    if (user?.sessionToken) {
      navigation.reset({
        routes: [
          {
            name: 'DrawerStack',
          },
        ],
      });
      // navigation.navigate('DrawerStack');
    }
  }, [dispatch, user, user?.sessionToken, user?.Result]);

  const visiblePassword = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  const onLogin = (loginId, password) => {
    let body = {
      LoginId: loginId,
      Password: password,
    };

    dispatch(signIn(body, setLoginModalVisible, setPwdModalVisible));
  };

  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1}}>
      <ScrollView>
        <ModalFrame
          visible={loginIdModalVisible}
          onPress={() => {
            setLoginModalVisible(false);
            dispatch(saveUserInfo(null));
          }}
        />
        <ModalFrame
          visible={pwdModalVisible}
          onPress={() => setPwdModalVisible(false)}
        />
        <ContainerStyled>
          <View style={{marginHorizontal: 30}}>
            <Image
              source={require('../../../asssets/icons/white_logo.png')}
              style={styles.logo}
            />
            <LabelNone text={'Kona Summit Platform'} style={styles.logoText} />
            <ContentInput
              source={require('../../../asssets/icons/Login/login_id_icon.png')}
              imageNone={true}
              onChangeText={text => setLoginId(text)}
              value={loginId}
            />
            <PasswordInput
              styleBox={{marginTop: 15}}
              noneImage={true}
              eyeSytle={{marginRight: 18}}
              secureTextEntry={passwordVisible}
              onPress={() => visiblePassword()}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <RowView style={styles.searchAndRePassword}>
              <Touchable onPress={() => navigation.navigate('SearchId')}>
                <RowView>
                  <LabelNone style={styles.searchText} />
                  <AntDesign name={'right'} size={14} style={styles.leftIcon} />
                </RowView>
              </Touchable>

              <Touchable onPress={() => navigation.navigate('RePassword')}>
                <RowView>
                  <LabelNone style={styles.searchText} />
                  <AntDesign name={'right'} size={14} style={styles.leftIcon} />
                </RowView>
              </Touchable>
            </RowView>
            <RowView style={styles.signUpBox}>
              <LabelNone style={styles.signUpText} />
              <Touchable onPress={() => navigation.navigate('SignUpAgree')}>
                <LabelNone style={styles.signup} />
              </Touchable>
            </RowView>
            <BottomButton
              style={styles.bottomBtn}
              onPress={() => onLogin(loginId, password)}
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
  signUpText: {color: '#555555', fontWeight: '400'},
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
