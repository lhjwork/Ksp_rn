import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ContainerGradient from '../../../components/Containers/ContainerGradient';
import HeaderCompnent from '../../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../../components/Labels';
import {ContainerStyled} from '../../../components/StyledComponents/StyledComponents';
import RowView from '../../../components/Views/RowView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Touchable from '../../../components/Touchable';
import {BottomButton} from '../../../components/Buttons/Buttons';
import {SIGNUP_NUM_DATA} from './SIGNUP_DATAS';
import PageNumbering from '../../../components/SignUp/PageNumbering';
import Agreement from '../../../components/Agreement';
import ModalFrame from '../../../components/Modals/ModalFrame';

const SUB_CONTENT_DATA = [
  {id: 1, text: '[필수]서비스 이용약관 동의', path: 'serviceAgree'},
  {id: 2, text: '[필수]개인정보 수집 및 이용 동의', path: 'privateInfoAgree'},
  {id: 3, text: '[선택]마케팅정보 알림 동의', path: 'marketingAgree'},
];

const SignUpAgree = ({navigation}) => {
  const [allAgree, setAllAgree] = useState(false);
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privateInfoAgree, setPrivateInfoAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

  const getAllAgree = () => {
    if (allAgree === false) {
      setAllAgree(true);
      setServiceAgree(true);
      setPrivateInfoAgree(true);
      setMarketingAgree(true);
    } else {
      setAllAgree(false);
      setServiceAgree(false);
      setPrivateInfoAgree(false);
      setMarketingAgree(false);
    }
  };

  const goNextPage = () => {
    if (serviceAgree === false || privateInfoAgree === false) {
      <ModalFrame />;
      return;
    }
    navigation.navigate('SelfAuth');
  };

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
          </RowView>

          <BoldLabelSubTitle
            text={
              '안녕하세요.\n저희 KSP가 처음이시군요!\nKSP 서비스 이용을 위해서는 아래와 같은 약관의 동의가 필요합니다.'
            }
            style={styles.contentText}
          />
          <RowView
            style={{
              backgroundColor: allAgree === true ? '#46A0BD' : '#fff',
              paddingVertical: 12,
              paddingHorizontal: 17.25,
              marginTop: 46,
              borderRadius: 10,
            }}>
            <Touchable onPress={() => getAllAgree()}>
              {allAgree === false ? (
                <Ionicons
                  name={'checkmark-circle-outline'}
                  size={19.5}
                  style={{color: '#C4C4C4'}}
                />
              ) : (
                <Ionicons
                  name={'checkmark-circle'}
                  size={19.5}
                  style={{color: '#fff'}}
                />
              )}
            </Touchable>

            <BoldLabelSubTitle
              text={'모두 동의하기'}
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineheight: 26.06,
                marginLeft: 13.25,
                color: allAgree === false ? '#555555' : '#fff',
              }}
            />
          </RowView>
          <View style={styles.subAgreeBox}>
            <Agreement
              text={'[필수]서비스 이용약관 동의'}
              isActive={serviceAgree}
              onPress={() => {
                setServiceAgree(!serviceAgree);
              }}
              DetailOpenPress={() => null}
            />
            <Agreement
              text={'[필수]개인정보 수집 및 이용 동의'}
              isActive={privateInfoAgree}
              onPress={() => {
                setPrivateInfoAgree(!privateInfoAgree);
              }}
              DetailOpenPress={() => null}
            />
            <Agreement
              text={'[선택]마케팅정보 알람 동의'}
              isActive={marketingAgree}
              onPress={() => {
                setMarketingAgree(!marketingAgree);
              }}
              DetailOpenPress={() => null}
            />
          </View>
        </View>
      </ContainerStyled>
      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        {allAgree === true ? (
          <></>
        ) : (
          <View style={styles.agreeNeed}>
            <LabelNone
              text={'필수 약관의 동의가 필요합니다.'}
              style={styles.agreeText}
            />
          </View>
        )}

        <BottomButton text={'다음'} onPress={() => goNextPage()} />
      </View>
    </LinearGradient>
  );
};

export default SignUpAgree;

const styles = StyleSheet.create({
  agreeText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '400',
  },
  agreeNeed: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 9,
    paddingHorizontal: 27,
    marginHorizontal: 60,
    marginBottom: 8,
    elevation: 5,
  },
  // contentBox: {
  //   justifyContent: 'space-between',
  //   marginRight: 13,
  //   marginLeft: 16.5,
  //   borderBottomColor: '#E5E5E5',
  //   borderBottomWidth: 1,
  // },
  onSmallIcon: {
    color: '#46A0BD',
    paddingRight: 11.5,
  },
  offSmallIcon: {
    color: '#C4C4C4',
    paddingRight: 11.5,
  },
  subTitleText: {
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 17,
    color: '#555555',
  },
  subAgreeBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
  },
  allAgree: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 17.25,
    marginTop: 46,
    borderRadius: 10,
  },
  contentText: {marginTop: 13, fontSize: 14, lineheight: 17},
});
