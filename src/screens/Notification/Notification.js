import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabelTitle} from '../../components/Labels';
import NotificationDetailComponent from '../../components/NotificationDetailComponent';
import api from '../../api';

const Notification = ({navigation}) => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNotices();
  }, []);

  const getNotices = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await api.post(
        'notices',
        JSON.stringify({Type: 'notice'}),
        config,
      );
      console.log('res', res?.data);
      setNotices(res?.data?.Result);
    } catch (e) {
      console.log(e);
      console.log(e.respose);
    }
  };

  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.openDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled>
        <BoldLabelTitle
          text={'공지사항'}
          style={{marginTop: 27.5, marginHorizontal: 30, marginBottom: 55}}
        />
        <ContainerStyled style={{backgroundColor: '#fff', elevation: 3}}>
          {notices.map((item, index) => (
            <NotificationDetailComponent
              text={item?.Title}
              date={item?.Date}
              index={index}
              onPress={() => navigation.navigate('NotificationDetail', {item})}
            />
          ))}
        </ContainerStyled>
      </ContainerStyled>
    </LinearGradient>
  );
};

export default Notification;
