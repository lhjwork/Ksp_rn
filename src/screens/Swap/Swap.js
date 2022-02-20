import React, {useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {AmountInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';
import {SCREEN_HEIGHT} from '../../constants';

const Swap = ({navigation}) => {
  const [kspPoint, setKspPoint] = useState(20000);
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.goBack()}
        onPerssDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{marginHorizontal: 24, flex: 1}}>
          <BoldLabelTitle text={'스왑'} style={{marginTop: 27.5}} />
          <BoldLabelSubTitle
            text={'TOTAL PORTFOLIO VALUE'}
            style={{marginTop: 13}}
          />
          <RowView style={styles.kspPointBox}>
            <Image
              source={require('../../asssets/images/white_circle_in_logo.png')}
              style={{width: 73, height: 73}}
              resizeMode="contain"
            />
            <RowView>
              <LabelNone
                text={kspPoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={styles.kspPoint}
              />
              <LabelNone text={'KSP'} style={styles.KspUnit} />
            </RowView>
          </RowView>
          <AmountInput
            placeholder={'수량을 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            rightText={'KSPC'}
            rightTextStyle={{marginRight: 16}}
            outStyle={{marginTop: 26}}
          />
          <LabelNone
            text={
              '[유의사항]\n\n' +
              '\t• 개인정보 입력에 유의해 주세요.\n' +
              '\t• KSPC 이외의 주소로는 전송되지 않아요.\n' +
              '\t• KSPC를 전송할 경우에는 이더리움 가스비가 필요합니다.\n' +
              '\t• 미리 이더리움을 충전해 놓으시기 바랍니다.'
            }
            style={{
              fontSize: 12,
              color: '#fff',
              fontWeight: '700',
              marginBottom: 26,
              marginTop: SCREEN_HEIGHT * 0.17,
            }}
          />
          <BottomButton style={styles.bottomBtnPosition} text={'포인트 전환'} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Swap;

const styles = StyleSheet.create({
  bottomBtnPosition: {marginBottom: 15},
  kspPoint: {fontSize: 30, color: '#fff', fontWeight: '700'},
  KspUnit: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23,
    color: '#fff',
    marginLeft: 41,
    marginRight: 9,
  },
  kspPointBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    marginTop: 37,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
});
