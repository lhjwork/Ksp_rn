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
import {saveUserInfo} from '../../redux/authSlice';
const PasswordChange = ({navigation}) => {
  const [passwordVisible1, setPasswordVisible1] = useState(true);
  const [passwordVisible2, setPasswordVisible2] = useState(true);
  const [passwordValue1, setPasswordValue1] = useState('');
  const [passwordValue2, setPasswordValue2] = useState('');
  const [pwdModalVisible, setPwdModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const isFocused = useIsFocused();

  const [errMsg, setErrMsg] = useState('');
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setPasswordValue1('');
    setPasswordValue2('');
  }, [isFocused]);

  const onClickChangePassword = async () => {
    if (passwordValue2.length < 6 || passwordValue1.length < 6) {
      setIsShow(true);
      return;
    }
    let body = {
      sessionToken,
      password: passwordValue1,
    };
    try {
      let {data} = await api.post(`/rePassword`, body, config);

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
      <ModalFrame
        infoText={errMsg}
        visible={isShow}
        onPress={() => {
          setIsShow(false);
        }}
      />
      <HasBoldModal
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
        <BoldLabelTitle />

        <BoldLabel14 style={{marginTop: 23, marginBottom: 9}} />

        <PasswordInput
          styleBox={{
            borderColor: passwordValue1?.length >= 1 ? '#46A0BD' : '#c4c4c4',
          }}
          noneImage={false}
          eyeSytle={{marginRight: 18}}
          textStyle={{marginLeft: 24}}
          secureTextEntry={passwordVisible1}
          onPress={() => visiblePassword1()}
          value={passwordValue1}
          // secureTextEntry={true}
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
          eyeSytle={{marginRight: 18}}
          textStyle={{marginLeft: 24}}
          secureTextEntry={passwordVisible2}
          onPress={() => visiblePassword2()}
          value={passwordValue2}
          onChangeText={text => setPasswordValue2(text)}
        />

        {passwordValue2?.length !== 0 &&
          passwordValue1?.length !== 0 &&
          (passwordValue1 !== passwordValue2 ? (
            <LabelNone
              style={{
                color: '#FF0000',
                fontSize: 12,
                marginLeft: 19,
                marginTop: 5,
              }}
            />
          ) : (
            <LabelNone
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
          style={{
            backgroundColor:
              passwordValue2?.length === 0 ||
              passwordValue1?.length === 0 ||
              passwordValue2 !== passwordValue1
                ? '#FFFFFF'
                : '#46A0BD',
          }}
          textStyle={{
            color:
              passwordValue2?.length === 0 ||
              passwordValue1?.length === 0 ||
              passwordValue2 !== passwordValue1
                ? '#C4C4C4'
                : '#fff',
          }}
          onPress={() => {
            if (passwordValue2 !== passwordValue1) {
              return;
            }
            onClickChangePassword();
          }}
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
