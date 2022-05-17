import React, {useCallback, useRef, useState} from 'react';
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
import {TERMS_DATA} from '../../../asssets/Data/TERMS_DATA';
import {SCREEN_HEIGHT} from '../../../constants';
import ToastMsg from '../../../components/toastMsg';

const SUB_CONTENT_DATA = [
  {id: 1, text: 'service', path: 'serviceAgree'},
  {id: 2, text: 'private info', path: 'privateInfoAgree'},
  {id: 3, text: 'marketing', path: 'marketingAgree'},
];

const SignUpAgree = ({navigation}) => {
  const [allAgree, setAllAgree] = useState(false);
  const [serviceAgree, setServiceAgree] = useState(false);
  const [privateInfoAgree, setPrivateInfoAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toastRef = useRef(null);

  const showToast = useCallback(() => {}, []);

  const getAllAgree = () => {
    if (!serviceAgree || !privateInfoAgree || !marketingAgree) {
      setAllAgree(true);
      setServiceAgree(true);
      setPrivateInfoAgree(true);
      setMarketingAgree(true);
    } else if (allAgree === false) {
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
      // setModalVisible(true);
      showToast();
      return;
    }
    navigation.navigate('SelfAuth');
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ModalFrame
        visible={modalVisible}
        onPress={() => setModalVisible(false)}
      />
      <HeaderCompnent
        rightView={false}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <View style={{marginHorizontal: 24}}>
          <RowView style={{marginTop: 27.5, justifyContent: 'space-between'}}>
            <BoldLabelTitle />
          </RowView>

          <BoldLabelSubTitle
            style={{...styles.contentText, marginBottom: 46}}
          />
          <Touchable onPress={() => getAllAgree()}>
            <RowView
              style={{
                backgroundColor:
                  serviceAgree && privateInfoAgree && marketingAgree
                    ? '#46A0BD'
                    : '#fff',
                paddingVertical: 12,
                paddingHorizontal: 17.25,
                borderRadius: 10,
              }}>
              {/*<Touchable onPress={() => getAllAgree()}>*/}
              {!(serviceAgree && privateInfoAgree && marketingAgree) ? (
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
              {/*</Touchable>*/}

              <BoldLabelSubTitle
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  lineHeight: 26,
                  marginLeft: 13,
                  color: !(serviceAgree && privateInfoAgree && marketingAgree)
                    ? '#555555'
                    : '#fff',
                }}
              />
            </RowView>
          </Touchable>
          <View style={styles.subAgreeBox}>
            <Agreement
              isActive={serviceAgree}
              onPress={() => {
                setServiceAgree(!serviceAgree);
              }}
              DetailOpenPress={() => {
                let termProps = TERMS_DATA[0];
                termProps.notLogin = true;
                navigation.navigate('TermsDetail', termProps);
              }}
              isRequire={true}
            />
            <Agreement
              isActive={privateInfoAgree}
              onPress={() => {
                setPrivateInfoAgree(!privateInfoAgree);
              }}
              DetailOpenPress={() => {
                let termProps = TERMS_DATA[1];
                termProps.notLogin = true;
                // notLogin
                navigation.navigate('TermsDetail', termProps);
              }}
              isRequire={true}
            />
            <Agreement
              isActive={marketingAgree}
              onPress={() => {
                setMarketingAgree(!marketingAgree);
              }}
              DetailOpenPress={() => {
                let termProps = TERMS_DATA[2];
                termProps.notLogin = true;
                // notLogin
                navigation.navigate('TermsDetail', termProps);
              }}
            />
          </View>
        </View>
      </ContainerStyled>

      <View style={{marginHorizontal: 24, marginBottom: 30}}>
        <View>
          <ToastMsg ref={toastRef} />
        </View>
        <BottomButton onPress={() => goNextPage()} />
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
  contentText: {marginTop: 13, fontSize: 14, lineHeight: 17},
});
