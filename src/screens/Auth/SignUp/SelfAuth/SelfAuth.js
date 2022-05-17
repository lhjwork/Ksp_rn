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

        setTrueModalVisible(true);
      } else {
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
      setModalVisible(true);
      return;
    }
    if (phoneUnlock === false) {
      setModalVisible(true);
      return;
    }
    if (codeVerify.length < 4) {
      setModalVisible(true);
      return;
    }
    if (checkPhone !== phoneNumber) {
      setModalVisible(true);
      return;
    }
    if (codeSame !== true) {
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
            <BoldLabelTitle />
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

          <BoldLabelSubTitle style={styles.contentText} />
          <LabelNone style={styles.subTitle} />
          <RowView>
            <AmountInput
              outStyle={{flex: 1}}
              onChangeText={text => setPhoneNumber(text)}
              value={phoneNumber}
              // rightText={'KSP'}

              textStyle={{marginLeft: 23}}
              maxLength={11}
            />

            <SmallButton style={styles.button} onPress={() => sendPhoneNum()} />
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
              style={{
                color: !codeSame ? '#FF0000' : '#46A0BD',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          )}
        </View>
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton
          onPress={() => onNextPage()}
          disabled={
            phoneNumber < 11 ||
            phoneUnlock === false ||
            codeVerify.length < 4 ||
            checkPhone !== phoneNumber ||
            codeSame !== true
          }
          style={{
            backgroundColor:
              phoneNumber < 11 ||
              phoneUnlock === false ||
              codeVerify.length < 4 ||
              checkPhone !== phoneNumber ||
              codeSame !== true
                ? '#FFFFFF'
                : '#46A0BD',
          }}
          textStyle={{
            color:
              phoneNumber < 11 ||
              phoneUnlock === false ||
              codeVerify.length < 4 ||
              checkPhone !== phoneNumber ||
              codeSame !== true
                ? '#C4C4C4'
                : '#fff',
          }}
          // phoneNumber < 11||phoneUnlock === false||codeVerify.length < 4||checkPhone !== phoneNumber||codeSame !== true
        />
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
