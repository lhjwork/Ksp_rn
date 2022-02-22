import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {BoldLabelTitle, LabelNone, BoldLabel14} from './Labels';
import {ContainerStyled} from './StyledComponents/StyledComponents';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RowView from './Views/RowView';
import Touchable from './Touchable';

const DRAWER_LIST_DATA = [
  {
    id: 1,
    img: require('../asssets/icons/setting_img.png'),
    title: '내정보',
    path: 'MyInfo',
  },
  {
    id: 2,
    img: require('../asssets/icons/calendar_img.png'),
    title: '출석체크',
    path: 'Calendar',
  },
  {
    id: 3,
    img: require('../asssets/icons/notice_img.png'),
    title: '공지사항',
    path: 'Notification',
  },
  {
    id: 4,
    img: require('../asssets/icons/pencle_img.png'),
    title: '약관',
    path: 'Terms',
  },
];

const DrawerComponent = ({navigation}) => {
  return (
    <ContainerStyled>
      <View style={{flex: 1}}>
        <View style={styles.titleBox}>
          <Touchable onPress={() => navigation.closeDrawer()}>
            <Feather name={'x'} size={13.18} style={styles.xBtn} />
          </Touchable>

          <RowView style={styles.titleRow}>
            <Image
              source={require('../asssets/images/null_image.png')}
              resizeMode={'contain'}
              style={{width: 30, height: 30, marginBottom: 7}}
            />
            <BoldLabelTitle
              text={'김코나'}
              style={{color: '#46A0BD', marginLeft: 9}}
            />
            <BoldLabel14 text={' 님,안녕하세요.'} style={{color: '#000'}} />
          </RowView>
          <LabelNone
            text={'kona123@gmail.com'}
            style={{
              color: '#000',
              fontWeight: '400',
              fontSize: 18,
              lineHeight: 22,
            }}
          />
        </View>
        <RowView style={styles.solidLine} />

        {DRAWER_LIST_DATA.map((menu, index) => (
          <Touchable
            onPress={() => {
              if (menu.path === 'MyInfo') {
                navigation.navigate(menu?.path);
              } else {
                Alert.alert('준비중입니다.');
                return;
              }
            }}
            key={index}>
            <RowView style={styles.imgAndtextRow}>
              <RowView style={{marginLeft: 13.5}}>
                <Image
                  source={menu?.img}
                  style={{width: 18, height: 18, marginRight: 10}}
                />
                <BoldLabel14 text={menu?.title} style={styles.listText} />
              </RowView>
              <AntDesign name="right" size={9} style={styles.antDesignSytle} />
            </RowView>
          </Touchable>
        ))}

        {/* 버전 정보  */}
        <RowView style={styles.imgAndtextRow}>
          <BoldLabel14 text={'버전정보v1.0'} style={styles.listText2} />
          <AntDesign name="right" size={9} style={styles.antDesignSytle} />
        </RowView>
      </View>

      {/* 로그아웃 */}
      <Touchable onPress={null}>
        <RowView style={styles.imgAndtextRow2}>
          <AntDesign
            name="logout"
            size={15}
            style={{marginLeft: 13.5, marginRight: 11.5}}
          />
          <BoldLabel14 text={'로그아웃'} style={styles.logoutText} />
        </RowView>
      </Touchable>
    </ContainerStyled>
  );
};

export default DrawerComponent;

const styles = StyleSheet.create({
  logoutText: {fontWeight: '400', color: '#555555'},
  antDesignSytle: {color: '#555555', fontWeight: 'bold', marginRight: 5.5},
  imgAndtextRow: {
    justifyContent: 'space-between',
    marginHorizontal: 24,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  imgAndtextRow2: {
    marginHorizontal: 24,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    marginBottom: 33,
  },
  listText: {color: '#555'},
  listText2: {color: '#C4C4C4', marginLeft: 13.5},
  solidLine: {
    height: 3,
    backgroundColor: '#E5E5E5',
    marginTop: 15,
  },
  titleRow: {marginTop: 30.4, marginBottom: 14},
  xBtn: {textAlign: 'right', padding: 5, color: '#46A0BD'},
  titleBox: {marginHorizontal: 24, height: 130.6, marginTop: 20},
  itemBox: {marginHorizontal: 24},
});
