import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabel14, BoldLabelTitle, LabelNone} from '../../components/Labels';
import {PasswordInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';

const PasswordChange = ({navigation}) => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordValue1, setPasswordValue1] = useState();
  const [passwordValue2, setPasswordValue2] = useState();

  const visiblePassword1 = () => {
    if (passwordVisible1 === true) {
      setPasswordVisible1(false);
    } else {
      setPasswordVisible1(true);
    }
  };
  const visiblePassword2 = () => {
    if (passwordVisible2 === true) {
      setPasswordVisible2(false);
    } else {
      setPasswordVisible2(true);
    }
  };

  console.log('passwordValue1', passwordValue1);
  console.log('passwordValue2', passwordValue2);
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPressLeftBtn={() => navigation.goBack()}
        onPerssDrawer={() => navigation.openDrawer()}
      />
      <ContainerStyled style={{marginHorizontal: 24, marginTop: 27.5}}>
        <BoldLabelTitle text={'비밀번호 변경'} />

        <BoldLabel14
          text={'새 비밀번호'}
          style={{marginTop: 23, marginBottom: 9}}
        />
        <PasswordInput
          noneImage={true}
          placeholder={'새 비밀번호'}
          eyeSytle={{marginRight: 18}}
          secureTextEntry={passwordVisible1}
          onPress={() => visiblePassword1()}
          value={passwordValue1}
          onChangeText={text => setPasswordValue1(text)}
        />
        <PasswordInput
          styleBox={{marginTop: 10}}
          noneImage={true}
          placeholder={'새 비밀번호 확인'}
          eyeSytle={{marginRight: 18}}
          secureTextEntry={passwordVisible2}
          onPress={() => visiblePassword2()}
          value={passwordValue2}
          onChangeText={text => setPasswordValue2(text)}
        />
        {passwordValue1 !== passwordValue2 ? (
          <LabelNone
            text={'비밀번호가 일치하지 않습니다.'}
            style={{
              color: '#FF0000',
              fontSize: 12,
              marginLeft: 19,
              marginTop: 5,
            }}
          />
        ) : (
          <LabelNone
            text={'비밀번호가 일치합니다.'}
            style={{
              color: '#46A0BD',
              fontSize: 12,
              marginLeft: 19,
              marginTop: 5,
            }}
          />
        )}
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton text={'변경'} />
      </View>
    </LinearGradient>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
});
