import React, {useCallback, useEffect, useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, StyleSheet} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {AmountInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';
import {SCREEN_HEIGHT} from '../../constants';
import ToastMsg from '../../components/toastMsg';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import {useIsFocused} from '@react-navigation/native';

const KspSend = ({navigation, route}) => {
  const {balance, isKspSend} = route?.params;
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const toastRef = useRef(null);

  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [errMsgModal, setErrMsgModal] = useState('');
  const isFocused = useIsFocused();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setSendAddress('');
    setSendAmount(0);
    if (route?.params?.balance.length === 0 || !route?.params) {
      navigation.goBack();
    }
  }, [isFocused]);

  const showToast = useCallback(errText => {
    toastRef.current.show(errText);
  }, []);

  const onClickSend = async () => {
    if (isKspSend) {
      if (balance.kspc < Number(sendAmount)) {
        await setErrMsgModal('보유한 Kspc 이상은 전송할 수 없습니다');
        setIsShow(true);
        return;
      }
    }
    if (!isKspSend) {
      if (balance.Ethereum < Number(sendAmount)) {
        await setErrMsgModal('보유한 ETH 이상은 전송할 수 없습니다');
        setIsShow(true);
        return;
      }
    }
    if (sendAmount === '' || sendAddress === '') {
      await setErrMsgModal('입력을 완료해주세요');
      setIsShow(true);
      return;
    }
    let body = {
      sessionToken,
      coin: isKspSend ? 'Ksp' : 'Ethereum',
      amount: sendAmount,
      toAddress: sendAddress.toString().trim(),
    };

    // console.log('body입니다', body);
    setIsDisabled(true);
    try {
      const res = await api.post('sendcoin', JSON.stringify(body), config);
      await setErrMsgModal(
        isKspSend
          ? `KSPC 출금 완료 시까지 \n최소 3분이 소요됩니다.`
          : `이더리움 출금 완료 시까지 \n최소 3분이 소요됩니다.`,
      );

      navigation.goBack();
      setIsShow(true);
    } catch (err) {
      console.log('err', err);
      console.log('err', err.response);
      console.log('err', err?.response?.data?.errMsg);
      if (err?.response?.data?.errMsg) {
        showToast(err.response.data.errMsg);
        return;
      }
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <TrueModalFrame
        onPress={() => {
          setIsShow(false);
        }}
        visible={isShow}
        infoText={errMsgModal}
      />
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <View style={{marginHorizontal: 24.5, flex: 1}}>
        <View style={{}}>
          <BoldLabelTitle
            text={isKspSend ? 'KSPC 보내기' : '이더리움 보내기'}
            style={{marginTop: 27.5}}
          />
          <BoldLabelSubTitle
            text={
              isKspSend
                ? 'KSPC 출금을 위해 주소를 입력해주세요.'
                : '이더리움 출금을 위해 주소를 입력해주세요.'
            }
            style={{marginTop: 13}}
          />
        </View>

        {/* <ContentInput
        // placeholder={'주소를 입력해주세요.'}
        // imageNone={false}
        // outStyle={{marginTop: 136, marginBottom: 15}}
        // textStyle={{marginLeft: 19}}
        /> */}
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.17,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <AmountInput
            outStyle={{marginBottom: 10}}
            placeholder={'주소를 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            value={sendAddress}
            onChangeText={setSendAddress}
            keyboardType={'default'}
          />
          <AmountInput
            placeholder={'수량을 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            rightText={isKspSend ? 'KSPC' : 'ETH'}
            value={sendAmount}
            onChangeText={setSendAmount}
          />

          <LabelNone text={'숫자만 입력해주세요.'} style={styles.onlyNumber} />
        </View>
        <View style={{marginTop: SCREEN_HEIGHT * 0.07}}>
          <ToastMsg ref={toastRef} />
        </View>

        <BottomButton
          onPress={onClickSend}
          text={'보내기'}
          disabled={isDisabled}
        />
      </View>
    </LinearGradient>
  );
};

export default KspSend;

const styles = StyleSheet.create({
  onlyNumber: {
    color: '#46A0BD',
    fontSize: 12,
    lineHight: 16,
    marginLeft: 9,
    marginTop: 5,
    marginBottom: 19,
  },
});
