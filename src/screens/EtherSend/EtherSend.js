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
        <BoldLabelTitle text={'이더리움 보내기'} style={{marginTop: 27.5}} />
        <BoldLabelSubTitle
          text={'이러리움 출금을 위해 주소를 입력해주세요.'}
          style={{marginTop: 13}}
        />
        {/* <ContentInput
          placeholder={'주소를 입력해주세요.'}
          imageNone={false}
          outStyle={{marginTop: 136, marginBottom: 15}}
          textStyle={{marginLeft: 19}}
        /> */}
        <View
          style={{
            marginTop: SCREEN_HEIGHT * 0.17,
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}>
          <AmountInput
            placeholder={'주소를 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            outStyle={{marginBottom: 15}}
          />
          <AmountInput
            placeholder={'수량을 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            rightText={'ETH'}
          />
          <LabelNone text={'숫자만 입력해주세요.'} style={styles.onlyNumber} />
        </View>
        <View style={{marginTop: SCREEN_HEIGHT * 0.07}}>
          <ToastMsg ref={toastRef} />
        </View>
        {/* <NoticeComponent
          outStyle={{marginHorizontal: 58, marginTop: 19, marginBottom: 10}}
          text={'지갑 주소가 올바르지 않습니다.'}
        /> */}
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
