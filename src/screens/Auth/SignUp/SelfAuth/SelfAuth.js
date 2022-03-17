import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
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

const SelfAuth = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifiedCode, setVerifiedCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [codeVerify, setCodeVerify] = useState('');
  const [codeSame, setCodeSame] = useState(false);
  const [phoneUnlock, setPhoneUnlock] = useState(false);

  const sendPhoneNum = async () => {
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
      console.log('tempboolean', tempboolean);
      if (tempboolean !== 'success') {
        setPhoneUnlock(false);
        return;
      } else if (tempboolean == 'success') {
        setPhoneUnlock(true);
      }
      if (tempboolean === true) {
        setModalText('이미 등록된 회원입니다.');
        setModalVisible(true);
      } else if (tempboolean === false || tempboolean === 'success') {
        setModalText('인증 번호가 전송되었습니다.');
        setModalVisible(true);
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
      body = {Phone: phoneNumber, Verification: verifiedCode};
      const res = await api.post('smsverify', JSON.stringify(body), config);
      console.log('Codeverify res', res?.data['Result']);
      setCodeVerify(res?.data['Result']);

      if (codeVerify === 'failed') {
        setCodeSame(false);
        return;
      } else if (codeVerify === 'success') {
        setCodeSame(true);
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onNextPage = () => {
    if (phoneNumber === 0) {
      return;
    }
    if (codeVerify.length === 0) {
      return;
    }
    if (codeSame !== 'success') {
      return;
    }
    if (phoneUnlock === false) {
      return;
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ModalFrame
        infoText={modalText}
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
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
              outStyle={{flex: 1}}
              onChangeText={text => setVerifiedCode(text)}
              value={verifiedCode}
              // rightText={'KSP'}
              placeholder="인증번호를 입력해주세요."
              textStyle={{marginLeft: 23}}
              maxLength1233={4}
            />
            <SmallButton
              style={styles.button}
              text={'확인'}
              onPress={() => Codeverify()}
            />
          </RowView>
          {codeSame === false ? (
            <LabelNone
              text={'인증번호가 일치하지 않습니다.'}
              style={{
                color: '#FF0000',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          ) : (
            <LabelNone
              text={'인증번호가 일치합니다.'}
              style={{
                color: '#46A0BD',
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
          text={'다음'}
          onPress={() => navigation.navigate('SignUp', {phoneNumber})}
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
