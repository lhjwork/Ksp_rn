import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {ContentInput, AmountInput} from '../../components/TxInput';
import RowView from '../../components/Views/RowView';
import {BottomButton, SmallButton} from '../../components/Buttons/Buttons';
import api from '../../api';
import {logoutSuccess, resetAuth} from '../../redux/authSlice';
import {config} from '../../constant';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import IDModal from '../../components/Modals/IDModal';
import {getVerifyCode} from '../../utils';
const SearchId = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [certification, setCertification] = useState('');
  const [infoText, setInfoText] = useState('');
  const [isShow, setIsShow] = useState(false);

  const [isShowIDModal, setIsShowIDModal] = useState(false);

  const [myId, setMyId] = useState(null);
  const [isNotCheckValid, setIsCheckValid] = useState(null); // 인증번호 확인되었는지
  const [checkName, setCheckName] = useState('');
  const [sendPhone, setSendPhone] = useState('');

  const sendPhoneMsg = async () => {
    setIsCheckValid(null);
    if (phoneNumber.length < 10) {
      setIsShow(true);
      return;
    }
    let body = {
      username: userName,
      phone: phoneNumber,
    };
    try {
      const {data} = await api.post(
        'smssendforloginid',
        JSON.stringify(body),
        config,
      );
      setSendPhone(phoneNumber);

      setIsShow(true);
    } catch (err) {
      setIsShow(true);
      console.log('err', err);
      console.log('err', err.response);
    }
  };
  const confirmationPhoneNumber = async () => {
    let body = {
      username: userName,
      phone: phoneNumber,
      codeVerify: certification,
    };
    try {
      const {data} = await api.post(
        'sendloginid',
        JSON.stringify(body),
        config,
      );
      setIsCheckValid(false);
      setCheckName(userName);
      setMyId(data?.loginId);
      console.log('data', data);
    } catch (err) {
      setIsCheckValid(true);
      console.log('err', err);
      console.log('err response', err.response);
    }
  };
  const showIdModal = async () => {
    if (checkName !== userName) {
      setIsShow(true);
      return;
    }
    if (sendPhone !== phoneNumber) {
      setIsShow(true);
      return;
    }

    setIsShowIDModal(true);
  };
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <TrueModalFrame
        visible={isShow}
        infoText={infoText}
        onPress={() => {
          setIsShow(false);
        }}
      />
      <IDModal
        visible={isShowIDModal}
        infoText={myId}
        onPress={() => {
          navigation.navigate('Login');
        }}
        userName={userName}
      />
      <HeaderCompnent
        rightView={false}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled style={{marginHorizontal: 24, marginTop: 27.5}}>
        <BoldLabelSubTitle style={styles.contentText} />
        <LabelNone style={styles.subTitle} />
        <View style={{height: 52}}>
          <ContentInput
            textStyle={styles.textStlye}
            onChangeText={text => setUserName(text)}
            value={userName}
          />
        </View>
        <LabelNone style={styles.subTitle2} />
        <RowView>
          <AmountInput
            outStyle={{flex: 1}}
            // rightText={'KSP'}

            textStyle={{marginLeft: 23}}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
          />
          <SmallButton style={styles.button} onPress={sendPhoneMsg} />
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
            onChangeText={text => setCertification(text)}
            value={certification}
            editable={isNotCheckValid}
            maxLength={4}
          />
          <SmallButton
            isDisabled={sendPhone === ''}
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
              if (sendPhone !== '') {
                confirmationPhoneNumber();
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

      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton
          style={{
            backgroundColor: isNotCheckValid !== false ? '#FFFFFF' : '#46A0BD',
          }}
          textStyle={{color: isNotCheckValid !== false ? '#C4C4C4' : '#fff'}}
          disabled={isNotCheckValid !== false}
          onPress={() => {
            if (isNotCheckValid === false) {
              showIdModal();
            }
          }}
        />
      </View>
    </LinearGradient>
  );
};

export default SearchId;

const styles = StyleSheet.create({
  contentText: {marginTop: 13, fontSize: 14, lineheight: 17, marginBottom: 56},
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
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
