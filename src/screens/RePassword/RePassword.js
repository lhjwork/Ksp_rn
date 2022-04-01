import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {AmountInput, ContentInput} from '../../components/TxInput';
import RowView from '../../components/Views/RowView';
import {SmallButton, BottomButton} from '../../components/Buttons/Buttons';
import api from '../../api';
import {saveUserInfo} from '../../redux/authSlice';
import {config} from '../../constant';
import ModalFrame from '../../components/Modals/ModalFrame';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import IDModal from '../../components/Modals/IDModal';
import HasBoldModal from '../../components/Modals/HasBoldModal';

const RePassword = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certification, setCertification] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [isErrModalShow, setIsErrModalShow] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(null);
  const [isCheckValid, setIsCheckValid] = useState(null);
  const [isShowLogin, setIsShowLogin] = useState(false);

  const ErrFunction = async () => {
    if (userId === '') {
      await setErrMsg('아이디를 입력해주세요');
      setIsErrModalShow(true);
      return true;
    } else if (userName === '') {
      await setErrMsg('이름을 입력해주세요');
      setIsErrModalShow(true);
      return true;
    } else if (phoneNumber === '') {
      await setErrMsg('휴대폰 번호를 입력해주세요');
      setIsErrModalShow(true);
      return true;
    }
    return false;
  };
  const sendPhoneMsg = async () => {
    if (await ErrFunction()) {
      setSendSuccess(false);
      return;
    }
    let body = {loginId: userId, username: userName, phone: phoneNumber};
    try {
      setIsCheckValid(true);
      const res = await api.post(
        'verifycodepasswordreset',
        JSON.stringify(body),
        config,
      );
      setSendSuccess(true);
      console.log('res', res?.data);
    } catch (e) {
      await setErrMsg('인증번호 전송에 실패하였습니다');
      setIsErrModalShow(true);
      console.log(e);
      console.log(e.response);
    }
  };
  const checkCertification = async () => {
    let body = {
      loginId: userId,
      username: userName,
      phone: phoneNumber,
      userCode: certification,
    };
    try {
      const res = await api.post(
        'checkcodepasswordreset',
        JSON.stringify(body),
        config,
      );
      setIsCheckValid(false);
      console.log('res', res?.data);
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };
  const sendNewPassword = async () => {
    let body = {
      loginId: userId,
      username: userName,
      phone: phoneNumber,
      userCode: certification,
    };
    try {
      const res = await api.post('passwordrest', JSON.stringify(body), config);
      setIsShowLogin(true);
      console.log('res', res?.data);
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HasBoldModal
        visible={isShowLogin}
        infoText={'로그인 하러가기'}
        onPress={() => {
          navigation.navigate('Login');
        }}
        oneText={'인증된 휴대폰 번호로'}
        twoText={'임시비밀번호'}
        threeText={'를 전송하였습니다'}
        // color,
        boldColor={'#000'}
      />

      <TrueModalFrame
        onPress={() => {
          setSendSuccess(false);
        }}
        visible={sendSuccess}
        infoText={'인증번호를 전송하였습니다.'}
      />
      <ScrollView>
        <HeaderCompnent
          rightView={false}
          onPressLeftBtn={() => navigation.goBack()}
        />
        <ContainerStyled style={{marginHorizontal: 24, marginTop: 27.5}}>
          <BoldLabelTitle text={'비밀번호 재설정'} />
          <BoldLabelSubTitle
            text={
              '비밀번호 재설정을 위해서는\n가입 시 등록하신 휴대폰번호의 인증이 필요합니다.\n인증된 번호로 임시 비밀번호를 전송해드립니다.'
            }
            style={styles.contentText}
          />
          <LabelNone text={'아이디'} style={styles.subTitle} />
          <ContentInput
            placeholder={'아이디를 입력해주세요.'}
            textStyle={styles.textStlye}
            value={userId}
            onChangeText={setUserId}
            outStyle={{
              borderColor:
                isErrModalShow && userId.length === 0 ? '#FF0000' : '#c4c4c4',
            }}
          />
          <LabelNone text={'이름'} style={styles.subTitle2} />
          <ContentInput
            placeholder={'이름을 입력해주세요.'}
            textStyle={styles.textStlye}
            value={userName}
            onChangeText={setUserName}
            outStyle={{
              borderColor:
                isErrModalShow && userName.length === 0 ? '#FF0000' : '#c4c4c4',
            }}
          />
          <LabelNone text={'휴대폰 번호'} style={styles.subTitle2} />
          <RowView>
            <AmountInput
              // rightText={'KSP'}
              placeholder="숫자만 입력해주세요."
              textStyle={{marginLeft: 23}}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              outStyle={{
                flex: 1,
                borderColor:
                  isErrModalShow && phoneNumber.length === 0
                    ? '#FF0000'
                    : '#c4c4c4',
              }}
            />

            <SmallButton
              style={styles.button}
              text={'전송'}
              onPress={sendPhoneMsg}
              isDisabled={sendSuccess}
            />
          </RowView>
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{flex: 1}}
              placeholder="인증번호를 입력해주세요."
              textStyle={{marginLeft: 23}}
              value={certification}
              onChangeText={setCertification}
              editable={isCheckValid}
            />
            <SmallButton
              style={{
                backgroundColor:
                  !isCheckValid && isCheckValid !== null
                    ? '#C4C4C4'
                    : certification.length === 4
                    ? '#46A0BD'
                    : '#FFFFFF',
                ...styles.button,
              }}
              textStyle={{
                color: certification.length === 4 ? '#fff' : '#46A0BD',
              }}
              text={'확인'}
              onPress={() => {
                if (isCheckValid === null) {
                  return;
                }
                if (isCheckValid !== false) {
                  checkCertification();
                }
              }}
            />
          </RowView>
          {isCheckValid !== null && (
            <LabelNone
              text={
                isCheckValid
                  ? '인증번호가 일치하지 않습니다.'
                  : '인증번호가 일치합니다.'
              }
              style={{
                color: isCheckValid ? '#FF0000' : '#46A0BD',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          )}
        </ContainerStyled>
      </ScrollView>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton
          disabled={isCheckValid !== false}
          text={'임시 비밀번호 전송'}
          onPress={e => {
            if (isCheckValid === false) {
              sendNewPassword(e);
            }
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default RePassword;
const styles = StyleSheet.create({
  contentText: {marginTop: 13, fontSize: 14, lineheight: 17, marginBottom: 56},
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineheight: 18,
    marginBottom: 11,
    marginLeft: 6,
  },
  subTitle2: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineheight: 18,
    marginBottom: 11,
    marginTop: 25,
    marginLeft: 8,
  },

  textStlye: {marginLeft: 23},
  button: {marginLeft: 5},
});
