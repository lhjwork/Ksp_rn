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
  const loginIdVerifyList = [
    '',
    '이미 사용중인 아이디 입니다.',
    '사용 가능한 아이디 입니다.',
  ];
  const emailVerifyList = [
    '',
    '이미 사용중인 이메일 입니다.',
    '사용 가능한 이메일 입니다.',
  ];
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
  const [checkId, setCheckId] = useState(''); //중복 확인을 누른 아아디
  const [checkEmail, setCheckEmail] = useState(''); //중복 확인을 누른 아아디

  //
  const onSignUp = async () => {
    // onBlockSignUp();
    if (!getVerifyCode(email)) {
      setModalContent('이메일을 형식에 맞춰서 입력해주세요');
      setModalVisible(true);
      return;
    }
    if (loginIdVerify === 1 || loginIdVerify === 0) {
      setModalContent('아이디 중복확인 후 회원가입이 가능합니다.');
      setModalVisible(true);
      return;
    }
    if (emailVerify === 1 || emailVerify === 0) {
      setModalContent('이메일 중복확인 후 회원가입이 가능합니다.');
      setModalVisible(true);
      return;
    }
    if (password1 !== password2) {
      setModalContent('비밀번호가 일치하지 않습니다');
      setModalVisible(true);
      return;
    }
    if (loginId !== checkId) {
      setModalContent('중복확인 아이디와 현재 아이디가 같지않습니다');
      setModalVisible(true);
      return;
    }
    if (email !== checkEmail) {
      setModalContent('중복확인 이메일과 현재 이메일이 같지않습니다');
      setModalVisible(true);
      return;
    }
    if (loginId.length === 0) {
      setModalContent('아이디 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (password1.length === 0) {
      setModalContent('비밀번호 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (username.length === 0) {
      setModalContent('이름 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (gender.length === 0) {
      setModalContent('성별을 선택해주세요.');
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
      await setModalContent('회원가입의 실패하였습니다');
      setModalVisible(true);
    }
  };

  const onLoginIdVerify = async () => {
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
      console.log('중복확인', res?.data);
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
      setModalContent('성별을 선택해주세요.');
      setModalVisible(true);
      return;
    }
    if (loginIdVerify === false || loginIdVerify === '') {
      setModalContent('아이디 중복확인 후 회원가입이 가능합니다.');
      setModalVisible(true);
      return;
    }
    if (emailVerify === false || emailVerify === '') {
      setModalContent('이메일 중복확인 후 회원가입이 가능합니다.');
      setModalVisible(true);
      return;
    }
    if (loginId.length === 0) {
      setModalContent('아이디 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (password1.length === 0) {
      setModalContent('비밀번호 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (username.length === 0) {
      setModalContent('이름 입력은 필수입니다.');
      setModalVisible(true);
      return;
    }
    if (gender.length === 0) {
      setModalContent('성별을 선택해주세요.');
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
            <BoldLabelTitle text={'회원가입'} />
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
          <BoldLabelSubTitle
            text={'회원가입을 위한 본인정보를 입력해주세요.'}
            style={styles.contentText}
          />
          <BoldLabel14
            text={'아이디'}
            style={{marginTop: 72, marginBottom: 9}}
          />
          <RowView>
            <ContentInput
              placeholder={'아이디입력'}
              textStyle={styles.textStlye}
              onChangeText={text => setLoginId(text)}
              value={loginId}
              outStyle={{marginRight: 5}}
              isHas={true}
            />
            <SmallButton
              text={'중복확인'}
              onPress={() => onLoginIdVerify()}
              isDisabled={checkId !== '' && loginId === checkId}
            />
          </RowView>
          <LabelNone
            text={loginIdVerifyList[loginIdVerify]}
            style={{
              color: loginIdVerify === 1 ? '#FF0000' : '#46A0BD',
              fontSize: 12,
              marginLeft: 19,
              marginTop: 5,
            }}
          />
          {/*{loginIdVerify === false || '' ? (*/}
          {/*  <LabelNone*/}
          {/*    text={'이미 사용중인 아이디 입니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#FF0000',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <LabelNone*/}
          {/*    text={'사용 가능한 아이디 입니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#46A0BD',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}

          <BoldLabel14
            text={'비밀번호'}
            style={{marginTop: 28, marginBottom: 9}}
          />
          <PasswordInput
            placeholder={'비밀번호 입력'}
            textStyle={styles.textStlye}
            eyeSytle={{marginRight: 16}}
            secureTextEntry={passwordVisible1}
            onPress={() => visiblePassword1()}
            onChangeText={text => setPassword1(text)}
            value={password1}
          />
          <PasswordInput
            placeholder={'비밀번호 재입력'}
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
                text={'비밀번호가 일치하지 않습니다.'}
                style={{
                  color: '#FF0000',
                  fontSize: 12,
                  marginLeft: 19,
                  marginTop: 5,
                }}
              />
            ) : (
              <LabelNone
                text={'비밀번호가 일치합니다.'}
                style={{
                  color: '#46A0BD',
                  fontSize: 12,
                  marginLeft: 19,
                  marginTop: 5,
                }}
              />
            ))}

          <LabelNone />
          <BoldLabel14 text={'이름'} style={{marginTop: 8, marginBottom: 9}} />
          <ContentInput
            placeholder={'이름을 입력해주세요.'}
            textStyle={styles.textStlye}
            onChangeText={text => setUsername(text)}
            value={username}
          />
          <BoldLabel14
            text={'휴대번호'}
            style={{marginTop: 25, marginBottom: 11}}
          />
          <ContentInput
            placeholder={'ex)01012345678'}
            textStyle={styles.textStlye}
            value={phoneNumber}
            editable={false}
          />
          <BoldLabel14
            text={'성별'}
            style={{marginTop: 25, marginBottom: 11}}
          />
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
                  text={'남'}
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
                  text={'여'}
                  style={{
                    color: genderFeMale === '' ? '#c4c4c4' : '#46A0BD',
                  }}
                />
              </View>
            </Touchable>
          </RowView>

          <BoldLabel14
            text={'이메일 주소'}
            style={{marginTop: 25, marginBottom: 11}}
          />
          <RowView>
            <ContentInput
              placeholder={'이메일을 입력해주세요.'}
              textStyle={styles.textStlye}
              value={email}
              onChangeText={text => setEmail(text)}
              outStyle={{marginRight: 5}}
            />

            <SmallButton
              text={'중복확인'}
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
                getVerifyCode(email)
                  ? emailVerifyList[emailVerify]
                  : '이메일을 형식에 맞춰서 입력해주세요'
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
          {/*{emailVerify === false || '' ? (*/}
          {/*  <LabelNone*/}
          {/*    text={'사용중인 이메일 입니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#FF0000',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <LabelNone*/}
          {/*    text={'사용가능한 이메일 입니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#46A0BD',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}

          <BottomButton
            style={{marginBottom: 30, marginTop: 88}}
            text={'다음'}
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
