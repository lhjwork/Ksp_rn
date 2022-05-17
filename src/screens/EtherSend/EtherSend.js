import React, {useRef, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, StyleSheet} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import {ContentInput, AmountInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';
import NoticeComponent from '../../components/NoticeComponent';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import ToastMsg from '../../components/toastMsg';

const EtherSend = ({navigation}) => {
  const toastRef = useRef(null);

  const showToast = useCallback(() => {
    toastRef.current.show('.');
  }, []);
  const onClickSend = () => {
    showToast();
  };
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <View style={{marginHorizontal: 24.5}}>
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.17,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <AmountInput
            textStyle={{marginLeft: 19}}
            outStyle={{marginBottom: 15}}
          />
          <AmountInput textStyle={{marginLeft: 19}} rightText={'ETH'} />
          <LabelNone style={styles.onlyNumber} />
        </View>
        <View style={{marginTop: SCREEN_HEIGHT * 0.07}}>
          <ToastMsg ref={toastRef} />
        </View>

        <BottomButton onPress={onClickSend} text={'보내기'} />
      </View>
    </LinearGradient>
  );
};

export default EtherSend;

const styles = StyleSheet.create({
  onlyNumber: {
    color: '#46A0BD',
    fontSize: 12,
    lineHight: 16,
    marginLeft: 9,
    marginTop: 5,
  },
});
