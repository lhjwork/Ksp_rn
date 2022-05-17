import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../../components/HeaderCompnent';
import {SIGNUP_NUM_DATA} from './SIGNUP_DATAS';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import RowView from '../../../components/Views/RowView';
import {
  BoldLabel14,
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../../components/Labels';
import PageNumbering from '../../../components/SignUp/PageNumbering';
import {ContentInput, PasswordInput} from '../../../components/TxInput';
import {BottomButton, SmallButton} from '../../../components/Buttons/Buttons';
import Touchable from '../../../components/Touchable';
import {SCREEN_WIDTH} from '../../../constants';
import api from '../../../api';
import ModalFrame from '../../../components/Modals/ModalFrame';
import TrueModalFrame from '../../../components/Modals/TrueModalFrame';
import {getVerifyCode} from '../../../utils';

const SignUp = ({navigation, route}) => {
  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [genderMale, setGenderMale] = useState('');
  const [genderFeMale, setGenderFeMale] = useState('');
  const [loginIdVerify, setLoginIdVerify] = useState(0);
  const [emailVerify, setEmailVerify] = useState(0);
  const [gender, setGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const [loginId, setLoginId] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(route.params.phoneNumber);
  const [email, setEmail] = useState('');

  //
  const [checkId, setCheckId] = useState('');
  const [checkEmail, setCheckEmail] = useState('');

  //
  const isDisabled =
    loginId.length < 6 ||
    !getVerifyCode(email) ||
    loginIdVerify === 1 ||
    loginIdVerify === 0 ||
    emailVerify === 1 ||
    emailVerify === 0 ||
    password1 !== password2 ||
    password1.length < 6 ||
    loginId !== checkId ||
    email !== checkEmail ||
    loginId.length < 6 ||
    password1.length === 0 ||
    username.length === 0 ||
    gender.length === 0;

  const onSignUp = async () => {
    //loginId.length < 6
    if (loginId.length < 6) {
      setModalVisible(true);
      return;
    }
    // onBlockSignUp();
    if (!getVerifyCode(email)) {
      setModalVisible(true);
      return;
    }
    if (loginIdVerify === 1 || loginIdVerify === 0) {
      setModalVisible(true);
      return;
    }
    if (emailVerify === 1 || emailVerify === 0) {
      setModalVisible(true);
      return;
    }
    if (password1 !== password2) {
      setModalVisible(true);
      return;
    }
    if (password1.length < 6) {
      setModalVisible(true);
      return;
    }
    if (loginId !== checkId) {
      setModalVisible(true);
      return;
    }
    if (email !== checkEmail) {
      setModalVisible(true);
      return;
    }
    if (loginId.length < 6) {
      setModalVisible(true);
      return;
    }
    if (password1.length === 0) {
      setModalVisible(true);
      return;
    }
    if (username.length === 0) {
      setModalVisible(true);
      return;
    }
    if (gender.length === 0) {
      setModalVisible(true);
      return;
    }

    try {
      let body = {
        LoginId: loginId,
        Password: password1,
        Username: username,
        Phone: phoneNumber,
        Email: email,
        Gender: gender,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await api.post('register', JSON.stringify(body), config);
      console.log('res', res);
      navigation.navigate('SignUpComplete');
    } catch (err) {
      if (err?.response?.data?.errMsg) {
        await setModalContent(err.response.data.errMsg);
        setModalVisible(true);
        return;
      }

      setModalVisible(true);
    }
  };

  const onLoginIdVerify = async () => {
    if (loginId.length < 6) {
      setModalVisible(true);
      setLoginIdVerify(3);
      return;
    }
    try {
      let body = {LoginId: loginId};
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await api.post(
        'loginidverification',
        JSON.stringify(body),
        config,
      );
      console.log(res?.data);
      const {Result} = res?.data;
      // console.log(Result);
      if (Result === 'alreadyloginId') {
        setLoginIdVerify(1);
      } else {
        setCheckId(loginId);
        setLoginIdVerify(2);
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };

  const onEmailVerify = async () => {
    try {
      let body = {
        Email: email,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const res = await api.post(
        'emailverification',
        JSON.stringify(body),
        config,
      );
      const {Result} = res?.data;
      if (Result === 'alreadyEmail') {
        setEmailVerify(1);
      } else {
        setCheckEmail(email);
        setEmailVerify(2);
      }
      console.log(Result);
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };

  const visiblePassword1 = () => {
    if (passwordVisible1 === true) {
      setPasswordVisible1(false);
    } else {
      setPasswordVisible1(true);
    }
  };
  const visiblePassword2 = () => {
    if (passwordVisible2 === true) {
      setPasswordVisible2(false);
    } else {
      setPasswordVisible2(true);
    }
  };

  const onBlockSignUp = () => {
    if (gender.length === 0) {
      setModalVisible(true);
      return;
    }
    if (loginIdVerify === false || loginIdVerify === '') {
      setModalVisible(true);
      return;
    }
    if (emailVerify === false || emailVerify === '') {
      setModalVisible(true);
      return;
    }
    if (loginId.length === 0) {
      setModalVisible(true);
      return;
    }
    if (password1.length === 0) {
      setModalVisible(true);
      return;
    }
    if (username.length === 0) {
      setModalVisible(true);
      return;
    }
    if (gender.length === 0) {
      setModalVisible(true);
      return;
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ModalFrame
        visible={modalVisible}
        infoText={modalContent}
        onPress={() => setModalVisible(false)}
      />

      <ScrollView>
        <HeaderCompnent
          rightView={false}
          onPressLeftBtn={() => navigation.goBack()}
        />

        <ContainerStyled style={{marginHorizontal: 24}}>
          <RowView
            style={{
              marginTop: 27.5,
              justifyContent: 'space-between',
            }}>
            <BoldLabelTitle />
            <RowView>
              {SIGNUP_NUM_DATA.map((num, index) => (
                <>
                  <PageNumbering
                    numId={num?.id}
                    key={index}
                    pageNum={3}
                    pastNum={1}
                    pastNum2={2}
                  />
                </>
              ))}
            </RowView>
          </RowView>
          <BoldLabelSubTitle style={styles.contentText} />
          <BoldLabel14 style={{marginTop: 72, marginBottom: 9}} />
          <RowView>
            <ContentInput
              textStyle={styles.textStlye}
              onChangeText={text => setLoginId(text)}
              value={loginId}
              outStyle={{marginRight: 5}}
              isHas={true}
            />
            <SmallButton
              onPress={() => onLoginIdVerify()}
              isDisabled={checkId !== '' && loginId === checkId}
            />
          </RowView>

          <LabelNone
            text={loginIdVerifyList[loginIdVerify]}
            style={{
              color:
                loginIdVerify === 1 || loginIdVerify === 3
                  ? '#FF0000'
                  : '#46A0BD',
              fontSize: 12,
              marginLeft: 19,
              marginTop: 5,
            }}
          />

          <BoldLabel14 style={{marginTop: 28, marginBottom: 9}} />
          <PasswordInput
            textStyle={styles.textStlye}
            eyeSytle={{marginRight: 16}}
            secureTextEntry={passwordVisible1}
            onPress={() => visiblePassword1()}
            onChangeText={text => setPassword1(text)}
            value={password1}
          />
          <PasswordInput
            textStyle={styles.textStlye}
            eyeSytle={{marginRight: 16}}
            styleBox={{marginTop: 5}}
            secureTextEntry={passwordVisible2}
            onPress={() => visiblePassword2()}
            onChangeText={text => setPassword2(text)}
            value={password2}
          />
          {password1.length !== 0 &&
            (password1 !== password2 ? (
              <LabelNone
                style={{
                  color: '#FF0000',
                  fontSize: 12,
                  marginLeft: 19,
                  marginTop: 5,
                }}
              />
            ) : (
              <LabelNone
                style={{
                  color: '#46A0BD',
                  fontSize: 12,
                  marginLeft: 19,
                  marginTop: 5,
                }}
              />
            ))}

          <LabelNone />
          <BoldLabel14 style={{marginTop: 8, marginBottom: 9}} />
          <ContentInput
            textStyle={styles.textStlye}
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <BoldLabel14 style={{marginTop: 25, marginBottom: 11}} />
          <ContentInput
            placeholder={'ex)01012345678'}
            textStyle={styles.textStlye}
            value={phoneNumber}
            editable={false}
          />
          <BoldLabel14 style={{marginTop: 25, marginBottom: 11}} />
          <RowView style={{justifyContent: 'space-between'}}>
            <Touchable
              style={{width: SCREEN_WIDTH * 0.445, height: 52}}
              onPress={() => {
                if (genderMale === '') {
                  setGenderFeMale('');
                  setGenderMale('Male');
                  setGender('Male');
                }
              }}>
              <View
                style={
                  genderMale === '' ? styles.genderMale : styles.genderMale2
                }>
                <BoldLabel14
                  style={{
                    color: genderMale === '' ? '#c4c4c4' : '#46A0BD',
                  }}
                />
              </View>
            </Touchable>

            <Touchable
              style={{width: SCREEN_WIDTH * 0.445, height: 52}}
              onPress={() => {
                if (genderFeMale === '') {
                  setGenderMale('');
                  setGenderFeMale('FeMale');
                  setGender('FeMale');
                }
              }}>
              <View
                style={
                  genderFeMale === ''
                    ? styles.genderFeMale
                    : styles.genderFeMale2
                }>
                <BoldLabel14
                  style={{
                    color: genderFeMale === '' ? '#c4c4c4' : '#46A0BD',
                  }}
                />
              </View>
            </Touchable>
          </RowView>

          <BoldLabel14 style={{marginTop: 25, marginBottom: 11}} />
          <RowView>
            <ContentInput
              textStyle={styles.textStlye}
              value={email}
              onChangeText={text => setEmail(text)}
              outStyle={{marginRight: 5}}
            />

            <SmallButton
              onPress={() => onEmailVerify()}
              isDisabled={
                !getVerifyCode(email)
                  ? true
                  : checkEmail !== '' && email === checkEmail
              }
            />
          </RowView>
          {/*emailVerifyList*/}
          {email.length > 0 && (
            <LabelNone
              text={
                getVerifyCode(email) ? emailVerifyList[emailVerify] : 'email'
              }
              style={{
                color: !getVerifyCode(email)
                  ? '#FF0000'
                  : emailVerify === 1
                  ? '#FF0000'
                  : '#46A0BD',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          )}

          <BottomButton
            style={{
              marginBottom: 30,
              marginTop: 88,
              backgroundColor: isDisabled !== false ? '#FFFFFF' : '#46A0BD',
            }}
            textStyle={{color: isDisabled !== false ? '#C4C4C4' : '#fff'}}
            disabled={isDisabled !== false}
            onPress={() => {
              onSignUp();
            }}
          />
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  genderFeMale: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#c4c4c4',
    borderLeftWidth: 1,
  },
  genderFeMale2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#46A0BD',
    borderLeftWidth: 2,
  },
  genderMale: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderRightWidth: 1,
    borderColor: '#c4c4c4',
  },
  genderMale2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderRightWidth: 2,
    borderColor: '#46A0BD',
  },

  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
  textStlye: {marginLeft: 23},
  idTextInput: {
    height: 52,
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
});
