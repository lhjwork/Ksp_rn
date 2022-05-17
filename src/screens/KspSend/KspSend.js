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
        setIsShow(true);
        return;
      }
    }
    if (!isKspSend) {
      if (balance.Ethereum < Number(sendAmount)) {
        setIsShow(true);
        return;
      }
    }
    if (sendAmount === '' || sendAddress === '') {
      setIsShow(true);
      return;
    }
    let body = {
      sessionToken,
      coin: isKspSend ? 'Ksp' : 'Ethereum',
      amount: sendAmount,
      toAddress: sendAddress.toString().trim(),
    };

    setIsDisabled(true);
    try {
      const res = await api.post('sendcoin', JSON.stringify(body), config);

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
          <BoldLabelTitle style={{marginTop: 27.5}} />
          <BoldLabelSubTitle style={{marginTop: 13}} />
        </View>

        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.17,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <AmountInput
            outStyle={{marginBottom: 10}}
            textStyle={{marginLeft: 19}}
            value={sendAddress}
            onChangeText={setSendAddress}
            keyboardType={'default'}
          />
          <AmountInput
            textStyle={{marginLeft: 19}}
            rightText={isKspSend ? 'KSPC' : 'ETH'}
            value={sendAmount}
            onChangeText={setSendAmount}
          />

          <LabelNone style={styles.onlyNumber} />
        </View>
        <View style={{marginTop: SCREEN_HEIGHT * 0.07}}>
          <ToastMsg ref={toastRef} />
        </View>

        <BottomButton onPress={onClickSend} disabled={isDisabled} />
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
