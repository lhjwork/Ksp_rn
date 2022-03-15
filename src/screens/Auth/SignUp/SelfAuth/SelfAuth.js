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
  const [getCode, setGetCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log('phonenumber', phoneNumber);

  const sendPhoneNum = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      body = {Phone: phoneNumber};
      data = await api.post('smsverification', JSON.stringify(body), config);
      console.log('sendPhoneNum data', data);
    } catch (e) {
      console.log(e);
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
      data = await api.post('smsverification', JSON.stringify(body), config);
      console.log('Codeverify data', data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ModalFrame
        infoText={'이미 등록된 회원입니다.'}
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
            {/* <NoneInput
              placeholder={'숫자만 입력해주세요.'}
              imageNone={false}
              textStyle={{marginLeft: 23}}
            /> */}
            <SmallButton
              style={styles.button}
              text={'전송'}
              onPress={() => sendPhoneNum()}
            />
          </RowView>
          <RowView style={{marginTop: 5}}>
            {/* <NoneInput
              placeholder={'인증번호를 입력해주세요.'}
              imageNone={false}
              textStyle={{marginLeft: 23}}
            /> */}
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
          {getCode !== verifiedCode ? (
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
