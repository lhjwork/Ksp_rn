import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../../components/HeaderCompnent';
import {SIGNUP_NUM_DATA} from './SIGNUP_DATAS';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import RowView from '../../../components/Views/RowView';
import {
  BoldLabel14,
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../../components/Labels';
import PageNumbering from '../../../components/SignUp/PageNumbering';
import {ContentInput, PasswordInput} from '../../../components/TxInput';
import {BottomButton} from '../../../components/Buttons/Buttons';
import Touchable from '../../../components/Touchable';
import {SCREEN_WIDTH} from '../../../constants';

const SignUp = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [genderMale, setGenderMale] = useState(false);
  const [genderFeMale, setGenderFeMale] = useState(false);

  const visiblePassword = () => {
    if (passwordVisible === true) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

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
          <ContentInput
            placeholder={'아이디입력'}
            textStyle={styles.textStlye}
          />
          <BoldLabel14
            text={'비밀번호'}
            style={{marginTop: 28, marginBottom: 9}}
          />
          <PasswordInput
            placeholder={'비밀번호 입력'}
            textStyle={styles.textStlye}
            eyeSytle={{marginRight: 16}}
            secureTextEntry={passwordVisible}
            onPress={() => visiblePassword()}
          />
          <PasswordInput
            placeholder={'비밀번호 재입력'}
            textStyle={styles.textStlye}
            eyeSytle={{marginRight: 16}}
            styleBox={{marginTop: 5}}
            secureTextEntry={passwordVisible}
            onPress={() => visiblePassword()}
          />
          <LabelNone />
          <BoldLabel14 text={'이름'} style={{marginTop: 8, marginBottom: 9}} />
          <ContentInput
            placeholder={'이름을 입력해주세요.'}
            textStyle={styles.textStlye}
          />
          <BoldLabel14
            text={'휴대번호'}
            style={{marginTop: 25, marginBottom: 11}}
          />
          <ContentInput
            placeholder={'ex)01012345678'}
            textStyle={styles.textStlye}
          />
          <BoldLabel14
            text={'성별'}
            style={{marginTop: 25, marginBottom: 11}}
          />
          <RowView style={{justifyContent: 'space-between'}}>
            <Touchable
              style={{width: SCREEN_WIDTH * 0.445, height: 52}}
              onPress={() => {
                if (genderMale === false) {
                  setGenderMale(true);
                } else {
                  setGenderMale(false);
                }
              }}>
              <View
                style={
                  genderMale === false ? styles.genderMale : styles.genderMale2
                }>
                <BoldLabel14
                  text={'남'}
                  style={{
                    color: genderMale === false ? '#c4c4c4' : '#46A0BD',
                  }}
                />
              </View>
            </Touchable>

            <Touchable
              style={{width: SCREEN_WIDTH * 0.445, height: 52}}
              onPress={() => {
                if (genderFeMale === false) {
                  setGenderFeMale(true);
                } else {
                  setGenderFeMale(false);
                }
              }}>
              <View
                style={
                  genderFeMale === false
                    ? styles.genderFeMale
                    : styles.genderFeMale2
                }>
                <BoldLabel14
                  text={'여'}
                  style={{
                    color: genderFeMale === false ? '#c4c4c4' : '#46A0BD',
                  }}
                />
              </View>
            </Touchable>
          </RowView>

          <BoldLabel14
            text={'이메일 주소'}
            style={{marginTop: 25, marginBottom: 11}}
          />
          <ContentInput
            placeholder={'이메일을 입력해주세요.'}
            textStyle={styles.textStlye}
          />
          <BottomButton
            style={{marginBottom: 30, marginTop: 88}}
            text={'다음'}
            onPress={() => navigation.navigate('SignUpComplete')}
          />
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  genderFeMale: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#c4c4c4',
  },
  genderFeMale2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 2,
    borderColor: '#46A0BD',
  },
  genderMale: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: '#c4c4c4',
  },
  genderMale2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: '#46A0BD',
  },

  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
  textStlye: {marginLeft: 23},
  idTextInput: {
    height: 52,
    backgroundColor: 'red',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
});
