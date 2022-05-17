import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {BoldLabelTitle, LabelNone, BoldLabel14} from './Labels';
import {ContainerStyled} from './StyledComponents/StyledComponents';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RowView from './Views/RowView';
import Touchable from './Touchable';
import {useSelector, useDispatch} from 'react-redux';
import api from '../api';

import {saveUserInfo} from '../redux/authSlice';
import {DrawerActions} from '@react-navigation/native';
import {
  getDrawerStatusFromState,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {resetNavigation} from '../utils';

const DRAWER_LIST_DATA = [
  {
    id: 1,
    img: require('../asssets/icons/setting_img.png'),
    path: 'MyInfo',
  },
  {
    id: 2,
    img: require('../asssets/icons/calendar_img.png'),
    path: 'Calendar',
  },
  {
    id: 5,
    img: require('../asssets/icons/purchase.png'),
    path: 'PurchaseHistory',
  },
  {
    id: 3,
    img: require('../asssets/icons/notice_img.png'),
    path: 'Notification',
  },
  {
    id: 4,
    img: require('../asssets/icons/pencle_img.png'),
    path: 'Terms',
  },
];

const DrawerComponent = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {email, username} = auth?.user;

  const onLogout = async () => {
    const config = {
      headers: {'Content-Type': 'application/json'},
    };
    try {
      const res = await api.post('applogout', {Logout: true}, config);
      dispatch(saveUserInfo(res?.data));
      resetNavigation(navigation, 'AuthStack');
      // navigation.navigate('AuthStack');
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };
  return (
    <ContainerStyled>
      <View style={{flex: 1}}>
        <View style={{...styles.titleBox}}>
          <Touchable
            onPress={() => {
              navigation.closeDrawer();
            }}>
            <Feather name={'x'} size={24} style={styles.xBtn} />
          </Touchable>
          <View>
            <RowView style={styles.titleRow}>
              <Image
                source={require('../asssets/images/null_image.png')}
                resizeMode={'contain'}
                style={{width: 30, height: 30}}
              />
              <BoldLabelTitle
                text={username}
                style={{color: '#46A0BD', marginLeft: 9}}
              />
              <BoldLabel14
                style={{
                  lineHeight: 20,
                  color: '#000',
                }}
              />
            </RowView>
            <LabelNone
              text={email}
              style={{
                color: '#000',
                fontWeight: '400',
                fontSize: 18,
                lineHeight: 22,
                marginLeft: 13,
              }}
            />
          </View>
        </View>
        <RowView style={styles.solidLine} />

        {DRAWER_LIST_DATA.map((menu, index) => (
          <Touchable
            onPress={async () => {
              await navigation.closeDrawer();
              navigation.navigate(menu?.path);
            }}
            key={index}>
            <RowView style={styles.imgAndtextRow}>
              <RowView style={{marginLeft: 13.5}}>
                <Image
                  source={menu?.img}
                  style={{width: 18, height: 18, marginRight: 10}}
                  resizeMode={'contain'}
                />
                <BoldLabel14 text={menu?.title} style={styles.listText} />
              </RowView>
              <AntDesign name="right" size={9} style={styles.antDesignSytle} />
            </RowView>
          </Touchable>
        ))}

        <RowView style={styles.imgAndtextRow}>
          <BoldLabel14 style={styles.listText2} />
          {/*<AntDesign name="right" size={9} style={styles.antDesignSytle} />*/}
        </RowView>
      </View>

      <Touchable onPress={() => onLogout()}>
        <RowView style={styles.imgAndtextRow2}>
          <AntDesign
            name="logout"
            size={15}
            style={{marginLeft: 13.5, marginRight: 11.5, color: '#555555'}}
          />
          <BoldLabel14 style={styles.logoutText} />
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
  listText2: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    color: '#C4C4C4',
    marginLeft: 13.5,
  },
  solidLine: {
    height: 3,
    backgroundColor: '#E5E5E5',
  },
  titleRow: {
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  xBtn: {textAlign: 'right', color: '#46A0BD'},
  titleBox: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 160,
    paddingRight: 30,
    paddingTop: 30,
    paddingBottom: 15,
    paddingLeft: 27,
  },
  itemBox: {marginHorizontal: 24},
});
