import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabelTitle} from '../../components/Labels';
import HeaderCompnent from '../../components/HeaderCompnent';
const Terms = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent
        onPerssDrawer={() => navigation.onPerssDrawer()}
        onPressLeftBtn={() => navigation.goBack()}
      />
      <ContainerStyled style={{marginHorizontal: 24}}>
        <BoldLabelTitle text={'약관'} style={{marginTop: 27.5}} />
      </ContainerStyled>
    </LinearGradient>
  );
};

export default Terms;
