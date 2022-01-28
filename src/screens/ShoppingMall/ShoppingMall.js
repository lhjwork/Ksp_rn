import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderCompnent from '../../components/HeaderCompnent';
import Touchable from '../../components/Touchable';
import LinearGradient from 'react-native-linear-gradient';
import ContainerGradient from '../../components/Containers/ContainerGradient';
import {BoldLabelSubTitle, BoldLabelTitle} from '../../components/Labels';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';

const ShoppingMall = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />

      <ContainerStyled>
        <View style={{marginHorizontal: 30}}>
          <BoldLabelTitle text={'코나 쇼핑몰'} style={{marginTop: 27.5}} />
          <BoldLabelSubTitle
            text={'TOTAL PORTFOLIL VALUE'}
            style={{marginTop: 13}}
          />
        </View>
        <View style={styles.adverBanner}></View>
        <View style={{marginHorizontal: 30}}>
          <FlatList />
        </View>
      </ContainerStyled>
    </LinearGradient>
  );
};

export default ShoppingMall;

const styles = StyleSheet.create({
  adverBanner: {
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: '#c4c4c4',
    marginTop: 24,
  },
});
