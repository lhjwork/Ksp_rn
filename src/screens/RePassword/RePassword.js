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
import {config} from '../../constant';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import HasBoldModal from '../../components/Modals/HasBoldModal';

const RePassword = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certification, setCertification] = useState('');
  const [checkPhoneNumber, setCheckPhoneNumber] = useState('');

  const [isErrModalShow, setIsErrModalShow] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(null);
  const [isNotCheckValid, setIsCheckValid] = useState(null);
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [infoText, setInfoText] = useState('');
  const [isShow, setIsShow] = useState(false);

  const ErrFunction = async () => {
    if (userId === '') {
      setIsShow(true);
      return true;
    } else if (userName === '') {
      setIsShow(true);
      return true;
    } else if (phoneNumber === '') {
      setIsShow(true);
      return true;
    }
    return false;
  };
  const sendPhoneMsg = async () => {
    setCheckPhoneNumber('');
    setIsCheckValid(null);
    if (phoneNumber.length < 10) {
      setIsShow(true);
      return;
    }
    if (await ErrFunction()) {
      setSendSuccess(false);
      return;
    }
    let body = {loginId: userId, username: userName, phone: phoneNumber};
    try {
      const res = await api.post(
        'verifycodepasswordreset',
        JSON.stringify(body),
        config,
      );
      setCheckPhoneNumber(phoneNumber);
      setSendSuccess(true);
      console.log('res', res?.data);
    } catch (e) {
      setIsShow(true);
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
      setIsCheckValid(true);
      console.log(e);
      console.log(e.response);
    }
  };
  const sendNewPassword = async () => {
    if (phoneNumber !== checkPhoneNumber) {
      setIsShow(true);
      return;
    }
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
      console.log(
        '070882368362758984258918535302436342143670611892367891923723146723217205340164925687274778234453534712389=4712390 4712389=74',
      );
      console.log(e);
      console.log(e.response);

      setIsShow(true);
    }
  };
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HasBoldModal
        visible={isShowLogin}
        onPress={() => {
          navigation.navigate('Login');
        }}
        // color,
        boldColor={'#000'}
      />
      <TrueModalFrame
        visible={isShow}
        infoText={infoText}
        onPress={() => {
          setIsShow(false);
        }}
      />
      <TrueModalFrame
        onPress={() => {
          setSendSuccess(false);
        }}
        visible={sendSuccess}
      />
      <ScrollView>
        <HeaderCompnent
          rightView={false}
          onPressLeftBtn={() => navigation.goBack()}
        />
        <ContainerStyled style={{marginHorizontal: 24, marginTop: 27.5}}>
          <BoldLabelSubTitle style={styles.contentText} />
          <LabelNone style={styles.subTitle} />
          <ContentInput
            textStyle={styles.textStlye}
            value={userId}
            onChangeText={setUserId}
            outStyle={{
              borderColor:
                isErrModalShow && userId.length === 0 ? '#FF0000' : '#c4c4c4',
            }}
          />
          <LabelNone style={styles.subTitle2} />
          <ContentInput
            textStyle={styles.textStlye}
            value={userName}
            onChangeText={setUserName}
            outStyle={{
              borderColor:
                isErrModalShow && userName.length === 0 ? '#FF0000' : '#c4c4c4',
            }}
          />
          <LabelNone style={styles.subTitle2} />
          <RowView>
            <AmountInput
              // rightText={'KSP'}

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
              onPress={sendPhoneMsg}
              isDisabled={sendSuccess}
            />
          </RowView>
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{
                flex: 1,
                borderColor:
                  isNotCheckValid === null
                    ? '#C4C4C4'
                    : isNotCheckValid
                    ? '#FF0000'
                    : '#46A0BD',
              }}
              textStyle={{marginLeft: 23}}
              value={certification}
              onChangeText={setCertification}
              editable={isNotCheckValid}
            />
            <SmallButton
              isDisabled={checkPhoneNumber === ''}
              style={{
                borderColor:
                  !isNotCheckValid && certification.length === 4
                    ? 'transparent'
                    : '#46A0BD',
                backgroundColor:
                  !isNotCheckValid && isNotCheckValid !== null
                    ? '#C4C4C4'
                    : certification.length === 4
                    ? '#46A0BD'
                    : '#FFFFFF',
                ...styles.button,
              }}
              textStyle={{
                color: certification.length === 4 ? '#fff' : '#46A0BD',
              }}
              onPress={() => {
                if (checkPhoneNumber !== '') {
                  checkCertification();
                }
              }}
            />
          </RowView>
          {isNotCheckValid !== null && (
            <LabelNone
              style={{
                color: isNotCheckValid ? '#FF0000' : '#46A0BD',
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
          style={{
            backgroundColor: isNotCheckValid !== false ? '#FFFFFF' : '#46A0BD',
          }}
          textStyle={{color: isNotCheckValid !== false ? '#C4C4C4' : '#fff'}}
          disabled={isNotCheckValid !== false}
          onPress={e => {
            if (isNotCheckValid === false) {
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
