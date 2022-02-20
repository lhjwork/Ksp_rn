import React from 'react';
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

const KspSend = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <View style={{marginHorizontal: 24.5}}>
        <BoldLabelTitle text={'KSPC 보내기'} style={{marginTop: 27.5}} />
        <BoldLabelSubTitle
          text={'KSPC 출금을 위해 주소를 입력해주세요.'}
          style={{marginTop: 13}}
        />
        <ContentInput
          placeholder={'주소를 입력해주세요.'}
          imageNone={false}
          outStyle={{marginTop: 136, marginBottom: 15}}
          textStyle={{marginLeft: 19}}
        />
        <AmountInput
          placeholder={'수량을 입력해주세요.'}
          textStyle={{marginLeft: 19}}
          rightText={'KSPC'}
        />
        <LabelNone text={'숫자만 입력해주세요.'} style={styles.onlyNumber} />
        <NoticeComponent
          outStyle={{marginHorizontal: 58, marginTop: 19, marginBottom: 10}}
          text={'지갑 주소가 올바르지 않습니다.'}
        />
        <BottomButton text={'보내기'} />
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
  },
});
