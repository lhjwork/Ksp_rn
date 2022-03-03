import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RowView from '../../components/Views/RowView';

const SUB_CONTENT_DATA = [
  {id: 1, text: '[필수]서비스 이용약관 동의', path: 'serviceAgree'},
  {id: 2, text: '[필수]개인정보 수집 및 이용 동의', path: 'privateInfoAgree'},
  {id: 3, text: '[선택]마케팅정보 알림 동의', path: 'marketingAgree'},
];

const Terms = ({navigation}) => {
  const [serviceAgree, setServiceAgree] = useState(false);
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.onPerssDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <View style={{marginHorizontal: 24}}>
          <BoldLabelTitle text={'약관'} style={{marginTop: 27.5}} />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 55,
            elevation: 4,
          }}>
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
                    // getEachAgree(menu?.path, menu?.id);
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
      </ContainerStyled>
    </LinearGradient>
  );
};

export default Terms;

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
