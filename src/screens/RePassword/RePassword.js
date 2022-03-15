import React from 'react';
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

const RePassword = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent
          rightView={false}
          onPressLeftBtn={() => navigation.goBack()}
        />
        <ContainerStyled style={{marginHorizontal: 24, marginTop: 27.5}}>
          <BoldLabelTitle text={'비밀번호 재설정'} />
          <BoldLabelSubTitle
            text={
              '비밀번호 재설정을 위해서는\n가입 시 등록하신 휴대폰번호의 인증이 필요합니다.\n인증된 번호로 임시 비밀번호를 전송해드립니다.'
            }
            style={styles.contentText}
          />
          <LabelNone text={'아이디'} style={styles.subTitle} />
          <ContentInput
            placeholder={'아이디를 입력해주세요.'}
            textStyle={styles.textStlye}
          />
          <LabelNone text={'이름'} style={styles.subTitle2} />
          <ContentInput
            placeholder={'이름을 입력해주세요.'}
            textStyle={styles.textStlye}
          />
          <LabelNone text={'휴대폰 번호'} style={styles.subTitle2} />
          <RowView>
            <AmountInput
              outStyle={{flex: 1}}
              // rightText={'KSP'}
              placeholder="숫자만 입력해주세요."
              textStyle={{marginLeft: 23}}
            />

            <SmallButton style={styles.button} text={'전송'} />
          </RowView>
          <RowView style={{marginTop: 5}}>
            <AmountInput
              outStyle={{flex: 1}}
              placeholder="인증번호를 입력해주세요."
              textStyle={{marginLeft: 23}}
            />
            <SmallButton style={styles.button} text={'확인'} />
          </RowView>
        </ContainerStyled>
      </ScrollView>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton text={'임시 비밀번호 전송'} />
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