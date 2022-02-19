import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
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
  const [selectedServiceAgreeId, setSelectedServiceAgreeId] = useState('');
  const [selectedPrivateInfoAgreeId, setSelectedPrivateInfoAgreeId] =
    useState('');
  const [selectedMarketingAgreeId, setSelectedMarketingAgreeId] = useState('');

  console.log('serviceAgree', serviceAgree);
  console.log('privateInfoAgree', privateInfoAgree);
  console.log('marketingAgree', marketingAgree);
  console.log('allAgree', allAgree);
  const getEachAgree = (item, id) => {
    item === 'serviceAgree' && serviceAgree === false
      ? setServiceAgree(true)
      : item === 'privateInfoAgree' && privateInfoAgree === false
      ? setPrivateInfoAgree(true)
      : item === 'marketingAgree' && marketingAgree === false
      ? setMarketingAgree(true)
      : null;

    item === 'serviceAgree' && serviceAgree === true
      ? setServiceAgree(false)
      : item === 'privateInfoAgree' && privateInfoAgree === true
      ? setPrivateInfoAgree(false)
      : item === 'marketingAgree' && marketingAgree === true
      ? setMarketingAgree(false)
      : null;

    // if (selectedServiceAgreeId === id) {
    //   setSelectedServiceAgreeId(null);
    // } else {
    //   setSelectedServiceAgreeId(id);
    // }

    // if (selectedPrivateInfoAgreeId === id) {
    //   setSelectedPrivateInfoAgreeId(null);
    // } else {
    //   setSelectedPrivateInfoAgreeId(id);
    // }
    // if (selectedMarketingAgreeId === id) {
    //   setSelectedMarketingAgreeId(null);
    // } else {
    //   setSelectedMarketingAgreeId(id);
    // }
  };

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

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent rightView={false} />

      <ContainerStyled>
        <View style={{marginHorizontal: 24}}>
          <RowView style={{marginTop: 27.5, justifyContent: 'space-between'}}>
            <BoldLabelTitle text={'회원가입'} />
            <RowView>
              {SIGNUP_NUM_DATA.map((num, index) => (
                <>
                  <PageNumbering numId={num?.id} key={index} pageNum={1} />
                </>
              ))}
            </RowView>
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
            {SUB_CONTENT_DATA.map((menu, index) => (
              <RowView
                style={{
                  justifyContent: 'space-between',
                  marginRight: 13,
                  marginLeft: 16.5,
                  borderBottomColor: index === 2 ? '#fff' : '#E5E5E5',
                  borderBottomWidth: 1,
                }}>
                <RowView>
                  <Touchable
                    onPress={() => {
                      getEachAgree(menu?.path, menu?.id);
                    }}>
                    {serviceAgree === false ? (
                      <Ionicons
                        name={'checkmark-circle-outline'}
                        size={15}
                        style={styles.offSmallIcon}
                      />
                    ) : (
                      <Ionicons
                        name={'checkmark-circle'}
                        size={15}
                        style={styles.onSmallIcon}
                      />
                    )}
                  </Touchable>

                  <BoldLabelSubTitle
                    text={menu?.text}
                    style={styles.subTitleText}
                  />
                </RowView>
                <Touchable>
                  <LabelNone
                    text={'[상세보기]'}
                    style={{color: '#46A0BD', fontWeight: '700'}}
                  />
                </Touchable>
              </RowView>
            ))}
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

        <BottomButton
          text={'다음'}
          onPress={() => navigation.navigate('SelfAuth')}
        />
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
