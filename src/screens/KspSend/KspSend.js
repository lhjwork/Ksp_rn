import React, {useCallback, useRef} from 'react';
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
import {Dimensions} from 'react-native';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import Touchable from '../../components/Touchable';
import ToastMsg from '../../components/toastMsg';

const KspSend = ({navigation}) => {
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
      <View style={{marginHorizontal: 24.5, flex: 1}}>
        <View style={{}}>
          <BoldLabelTitle text={'KSPC 보내기'} style={{marginTop: 27.5}} />
          <BoldLabelSubTitle
            text={'KSPC 출금을 위해 주소를 입력해주세요.'}
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
            // rightText={'KSPC'}
          />
          <AmountInput
            placeholder={'수량을 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            rightText={'KSPC'}
          />

          <LabelNone text={'숫자만 입력해주세요.'} style={styles.onlyNumber} />
        </View>
        <View style={{marginTop: SCREEN_HEIGHT * 0.07}}>
          <ToastMsg ref={toastRef} />
        </View>

        <BottomButton onPress={onClickSend} text={'보내기'} />
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
