import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabelTitle, LabelNone, BoldLabel14} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {AmountInput, NoneInput} from '../../components/TxInput';
import {SmallButton} from '../../components/Buttons/Buttons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const StackingApply = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPressLeftBtn={() => navigation.goBack()}
        onPerssDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{marginHorizontal: 24}}>
          <BoldLabelTitle
            text={'KSP - 스테이킹 신청'}
            style={{marginTop: 27.5, marginBottom: 33}}
          />
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{flex: 1}}
              rightText={'KSP'}
              placeholder="수량을 입력해주세요."
              textStyle={{marginLeft: 19}}
            />
            <SmallButton style={styles.button} text={'계산'} />
          </RowView>
          <LabelNone
            text={'최소 신청 수량은 1,000KSP 입니다.'}
            style={styles.onlyNumber}
          />
          <RowView>
            <FontAwesome
              name={'exclamation-triangle'}
              size={20}
              style={styles.exclamationStyle}
            />
            <BoldLabel14
              text={'스테이킹 안내사항'}
              style={styles.exclamationText}
            />
            <View style={{height: 1, backgroundColor: '#DF8600', flex: 1}} />
          </RowView>
          <BoldLabel14
            text={
              '\t• 기준 : 매 분기 1회 진행\n' +
              '\t• 년간 총 4회 (리워드 풀 매년 수량의 5% 책정)\n' +
              '\t• 2022년 1분기 터치-스테이킹이 아래와 같이 시작됩니\n\t\t다.\n' +
              '\t• 신청기간 : 2022년 01월 01일 ~ 01월 10일\n' +
              '\t• 최소 신청수량 : 1,000 Ksp\n' +
              '\t• 지급(예상)이자 : 7%\n' +
              '\t• 이자 지급 계산은 위의 표를 참고해주시길 바랍니다.'
            }
            style={styles.noticeText}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default StackingApply;

const styles = StyleSheet.create({
  noticeText: {
    color: '#000',
    marginTop: 9,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#DF8600',
  },
  exclamationText: {
    color: '#DF8600',
    fontWeight: '700',
    marginRight: 9,
    marginLeft: 5.1,
  },
  exclamationStyle: {color: '#DF8600'},
  button: {marginLeft: 5},
  onlyNumber: {
    color: '#46A0BD',
    fontSize: 12,
    lineHight: 16,
    marginLeft: 9,
    marginTop: 5,
    marginBottom: 27,
  },
});
