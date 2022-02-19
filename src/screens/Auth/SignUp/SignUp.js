import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../../components/HeaderCompnent';
import {ScrollView} from 'react-native-gesture-handler';
import {SIGNUP_NUM_DATA} from './SIGNUP_DATAS';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import RowView from '../../../components/Views/RowView';
import {
  BoldLabel14,
  BoldLabelSubTitle,
  BoldLabelTitle,
} from '../../../components/Labels';
import PageNumbering from '../../../components/SignUp/PageNumbering';
import {ContentInput, PasswordInput} from '../../../components/TxInput';

const SignUp = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent
          rightView={false}
          onPressLeftBtn={() => navigation.goBack()}
        />

        <ContainerStyled style={{marginHorizontal: 24}}>
          <RowView
            style={{
              marginTop: 27.5,
              justifyContent: 'space-between',
            }}>
            <BoldLabelTitle text={'회원가입'} />
            <RowView>
              {SIGNUP_NUM_DATA.map((num, index) => (
                <>
                  <PageNumbering
                    numId={num?.id}
                    key={index}
                    pageNum={3}
                    pastNum={1}
                    pastNum2={2}
                  />
                </>
              ))}
            </RowView>
          </RowView>
          <BoldLabelSubTitle
            text={'회원가입을 위한 본인정보를 입력해주세요.'}
            style={styles.contentText}
          />
          <BoldLabel14
            text={'아이디'}
            style={{marginTop: 72, marginBottom: 9}}
          />
          <ContentInput placeholder={'아이디입력'} textStyle={{}} />
          <BoldLabel14
            text={'비밀번호'}
            style={{marginTop: 28, marginBottom: 9}}
          />
          <PasswordInput />
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
});
