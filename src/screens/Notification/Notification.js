import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabelTitle} from '../../components/Labels';
import NotificationDetailComponent from '../../components/NotificationDetailComponent';
const Notification = () => {
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
          <NotificationDetailComponent />
        </ContainerStyled>
      </ContainerStyled>
    </LinearGradient>
  );
};

export default Notification;
