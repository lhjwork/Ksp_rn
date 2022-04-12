import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabel14, BoldLabelTitle, LabelNone} from '../../components/Labels';
import {PasswordInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';
import ModalFrame from '../../components/Modals/ModalFrame';
import HasBoldModal from '../../components/Modals/HasBoldModal';
import {useIsFocused} from '@react-navigation/native';
const PasswordChange = ({navigation}) => {
  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordValue1, setPasswordValue1] = useState('');
  const [passwordValue2, setPasswordValue2] = useState('');
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const isFocused = useIsFocused();

  useEffect(() => {
    setPasswordValue1('');
    setPasswordValue2('');
  }, [isFocused]);

  const onClickChangePassword = async () => {
    let body = {
      sessionToken,
      password: passwordValue1,
    };
    try {
      let {data} = await api.post(`/rePassword`, body, config);
      console.log('비밀번호 변경', data);
      if (data?.result === 'success') {
        setIsSuccess(true);
        navigation.navigate('ShoppingMall');
        console.log(data);
      } else {
        setIsSuccess(false);
        //  실패
      }

      // navigation.navigate('main');
    } catch (e) {
      console.log('비밀변호 변경 에러 제거', e);
      console.log(e.response);
      setIsSuccess(false);
    } finally {
      setPwdModalVisible(true);
    }
  };
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
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HasBoldModal
        // oneText={'인증된 휴대폰 번호로'}
        twoText={
          isSuccess ? '비밀번호 변경 ' : '비밀번호 변경에 실패하였습니다'
        }
        threeText={isSuccess ? '이완료되었습니다.' : null}
        boldColor={'#000'}
        color={'#555'}
        visible={pwdModalVisible}
        onPress={() => setPwdModalVisible(false)}
      />
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
          styleBox={{
            borderColor: passwordValue1?.length >= 1 ? '#46A0BD' : '#c4c4c4',
          }}
          noneImage={false}
          placeholder={'새 비밀번호'}
          eyeSytle={{marginRight: 18}}
          textStyle={{marginLeft: 24}}
          secureTextEntry={passwordVisible1}
          onPress={() => visiblePassword1()}
          value={passwordValue1}
          secureTextEntry={true}
          onChangeText={text => setPasswordValue1(text)}
        />
        <PasswordInput
          styleBox={{
            borderColor:
              passwordValue2?.length < 1
                ? '#c4c4c4'
                : passwordValue1 !== passwordValue2
                ? '#FF0000'
                : '#46A0BD',
            marginTop: 10,
          }}
          noneImage={false}
          placeholder={'새 비밀번호 확인'}
          eyeSytle={{marginRight: 18}}
          textStyle={{marginLeft: 24}}
          secureTextEntry={true}
          onPress={() => visiblePassword2()}
          value={passwordValue2}
          onChangeText={text => setPasswordValue2(text)}
        />

        {passwordValue2?.length !== 0 &&
          passwordValue1?.length !== 0 &&
          (passwordValue1 !== passwordValue2 ? (
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
          ))}
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <BottomButton
          onPress={() => {
            if (passwordValue2 !== passwordValue1) {
              return;
            }
            onClickChangePassword();
          }}
          text={'변경'}
          disabled={
            passwordValue2?.length === 0 ||
            passwordValue1?.length === 0 ||
            passwordValue2 !== passwordValue1
          }
        />
      </View>
    </LinearGradient>
  );
};

export default PasswordChange;

const styles = StyleSheet.create({
  contentText: {marginTop: 14, fontSize: 14, lineheight: 17},
});
