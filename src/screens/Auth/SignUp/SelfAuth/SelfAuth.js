import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../../../components/HeaderCompnent';
import {ContainerStyled} from '../../../../components/StyledComponents/StyledComponents';
import {SIGNUP_NUM_DATA} from '../SIGNUP_DATAS';
import RowView from '../../../../components/Views/RowView';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../../../components/Labels';
import PageNumbering from '../../../../components/SignUp/PageNumbering';
import {
  ContentInput,
  NoneInput,
  AmountInput,
} from '../../../../components/TxInput';
import {
  SmallButton,
  BottomButton,
} from '../../../../components/Buttons/Buttons';
import api from '../../../../api';
import ModalFrame from '../../../../components/Modals/ModalFrame';
import TrueModalFrame from '../../../../components/Modals/TrueModalFrame';

const SelfAuth = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifiedCode, setVerifiedCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [trueModalVisible, setTrueModalVisible] = useState(false);
  const [trueModalText, setTrueModalText] = useState('');
  const [codeVerify, setCodeVerify] = useState(''); //보낸 인증번호
  const [codeSame, setCodeSame] = useState(''); //인증코드가 같은지 여부
  const [phoneUnlock, setPhoneUnlock] = useState(false); //전송여부
  //
  const [checkPhone, setCheckPhone] = useState('');

  const sendPhoneNum = async () => {
    setCodeSame('');
    if (phoneNumber.length < 10) {
      await setTrueModalText('휴대폰 번호를 입력해주세요');
      setTrueModalVisible(true);
      return;
    }
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let body = {Phone: phoneNumber};
      const res = await api.post(
        'smsverification',
        JSON.stringify(body),
        config,
      );

      const {data} = res;
      let tempboolean = data['Result'];

      setPhoneUnlock(true);
      if (tempboolean === 'success' || tempboolean.length === 4) {
        setCheckPhone(phoneNumber);
        await setTrueModalText('인증 번호가 전송되었습니다.');
        setTrueModalVisible(true);
      } else {
        await setTrueModalText('인증번호 전송 실패하였습니다');
        setTrueModalVisible(true);
      }
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };

  const Codeverify = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let body = {Phone: phoneNumber, Verification: verifiedCode};
      const res = await api.post('smsverify', JSON.stringify(body), config);
      console.log('codever', res);

      setCodeVerify(res?.data['Result']);
      if (res?.data['Result'] === 'failed') {
        setCodeSame(false);
      } else if (res?.data['Result'] === 'success') {
        setCodeSame(true);
      }
    } catch (e) {
      setCodeSame(false);
    }
  };

  const onNextPage = () => {
    if (phoneNumber < 11) {
      setModalText('휴대폰 번호는 11자리 입니다.');
      setModalVisible(true);
      return;
    }
    if (phoneUnlock === false) {
      setModalText('휴대번호를 전송바랍니다.');
      setModalVisible(true);
      return;
    }
    if (codeVerify.length < 4) {
      setModalText('인증번호는 4자리 입니다.');
      setModalVisible(true);
      return;
    }
    if (checkPhone !== phoneNumber) {
      setModalText('인증요청 번호와 현재 번호가 다릅니다');
      setModalVisible(true);
      return;
    }
    if (codeSame !== true) {
      setModalText('인증번호가 일치하지 않습니다.');
      setModalVisible(true);
      return;
    }
    navigation.navigate('SignUp', {phoneNumber});
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ModalFrame
        infoText={modalText}
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
      />
      <TrueModalFrame
        infoText={trueModalText}
        visible={trueModalVisible}
        onPress={() => setTrueModalVisible(false)}
      />
      <HeaderCompnent
        rightView={false}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <View style={{marginHorizontal: 24}}>
          <RowView style={{marginTop: 27.5, justifyContent: 'space-between'}}>
            <BoldLabelTitle text={'회원가입'} />
            <RowView>
              {SIGNUP_NUM_DATA.map((num, index) => (
                <>
                  <PageNumbering
                    numId={num?.id}
                    key={index}
                    pageNum={2}
                    pastNum={1}
                  />
                </>
              ))}
            </RowView>
          </RowView>

          <BoldLabelSubTitle
            text={'본인 인증을 위해 필요한 정보를 입력해주세요.'}
            style={styles.contentText}
          />
          <LabelNone text={'휴대폰 번호'} style={styles.subTitle} />
          <RowView>
            <AmountInput
              outStyle={{flex: 1}}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              // rightText={'KSP'}
              placeholder="숫자만 입력해주세요."
              textStyle={{marginLeft: 23}}
              maxLength={11}
            />

            <SmallButton
              style={styles.button}
              text={'전송'}
              onPress={() => sendPhoneNum()}
            />
          </RowView>
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{
                flex: 1,
                borderColor:
                  phoneUnlock === true && codeSame === false
                    ? '#FF0000'
                    : '#c4c4c4',
              }}
              onChangeText={text => setVerifiedCode(text)}
              value={verifiedCode}
              // rightText={'KSP'}
              placeholder="인증번호를 입력해주세요."
              textStyle={{marginLeft: 23}}
              maxLength={4}
            />
            <SmallButton
              isDisabled={codeSame}
              // setCodeSame
              style={{
                backgroundColor: codeSame
                  ? '#C4C4C4'
                  : verifiedCode.length === 4
                  ? '#46A0BD'
                  : '#FFFFFF',
                ...styles.button,
              }}
              textStyle={{
                color: verifiedCode.length === 4 ? '#fff' : '#46A0BD',
              }}
              text={'확인'}
              onPress={async () => {
                if (phoneUnlock === false) {
                  await setModalText('휴대번호를 전송바랍니다.');
                  setModalVisible(true);
                  return;
                }
                Codeverify();
              }}
            />
          </RowView>
          {codeSame.length !== 0 && (
            <LabelNone
              text={
                !codeSame
                  ? '인증번호가 일치하지 않습니다.'
                  : '인증번호가 일치합니다.'
              }
              style={{
                color: !codeSame ? '#FF0000' : '#46A0BD',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          )}
          {/*{codeSame === false ? (*/}
          {/*  <LabelNone*/}
          {/*    text={'인증번호가 일치하지 않습니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#FF0000',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <LabelNone*/}
          {/*    text={'인증번호가 일치합니다.'}*/}
          {/*    style={{*/}
          {/*      color: '#46A0BD',*/}
          {/*      fontSize: 12,*/}
          {/*      marginLeft: 19,*/}
          {/*      marginTop: 5,*/}
          {/*    }}*/}
          {/*  />*/}
          {/*)}*/}
        </View>
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton text={'다음'} onPress={() => onNextPage()} />
      </View>
    </LinearGradient>
  );
};

export default SelfAuth;

const styles = StyleSheet.create({
  button: {marginLeft: 5},
  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineheight: 18,
    marginTop: 67,
    marginBottom: 11,
  },
});
