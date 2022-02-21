import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../../../components/HeaderCompnent';
import {ContainerStyled} from '../../../../components/StyledComponents/StyledComponents';
import {SIGNUP_NUM_DATA} from '../SIGNUP_DATAS';
import RowView from '../../../../components/Views/RowView';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../../../components/Labels';
import PageNumbering from '../../../../components/SignUp/PageNumbering';
import {
  ContentInput,
  NoneInput,
  AmountInput,
} from '../../../../components/TxInput';
import {
  SmallButton,
  BottomButton,
} from '../../../../components/Buttons/Buttons';

const SelfAuth = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        rightView={false}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <View style={{marginHorizontal: 24}}>
          <RowView style={{marginTop: 27.5, justifyContent: 'space-between'}}>
            <BoldLabelTitle text={'회원가입'} />
            <RowView>
              {SIGNUP_NUM_DATA.map((num, index) => (
                <>
                  <PageNumbering
                    numId={num?.id}
                    key={index}
                    pageNum={2}
                    pastNum={1}
                  />
                </>
              ))}
            </RowView>
          </RowView>

          <BoldLabelSubTitle
            text={'본인 인증을 위해 필요한 정보를 입력해주세요.'}
            style={styles.contentText}
          />
          <LabelNone text={'휴대폰 번호'} style={styles.subTitle} />
          <RowView>
            <AmountInput
              outStyle={{flex: 1}}
              // rightText={'KSP'}
              placeholder="숫자만 입력해주세요."
              textStyle={{marginLeft: 23}}
            />
            {/* <NoneInput
              placeholder={'숫자만 입력해주세요.'}
              imageNone={false}
              textStyle={{marginLeft: 23}}
            /> */}
            <SmallButton style={styles.button} text={'전송'} />
          </RowView>
          <RowView style={{marginTop: 5}}>
            {/* <NoneInput
              placeholder={'인증번호를 입력해주세요.'}
              imageNone={false}
              textStyle={{marginLeft: 23}}
            /> */}
            <AmountInput
              outStyle={{flex: 1}}
              // rightText={'KSP'}
              placeholder="인증번호를 입력해주세요."
              textStyle={{marginLeft: 23}}
            />
            <SmallButton style={styles.button} text={'확인'} />
          </RowView>
        </View>
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton
          text={'다음'}
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </LinearGradient>
  );
};

export default SelfAuth;

const styles = StyleSheet.create({
  button: {marginLeft: 5},
  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
  subTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineheight: 18,
    marginTop: 67,
    marginBottom: 11,
  },
});
