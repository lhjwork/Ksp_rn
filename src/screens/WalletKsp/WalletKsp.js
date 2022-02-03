import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import {BoldLabelSubTitle, BoldLabelTitle} from '../../components/Labels';
import {SCREEN_HEIGHT} from '../../constants';
import ColumnView from '../../components/Views/Column';
const WalletKsp = ({navigation}) => {
  return (
    <LinearGradient colors={['#91C7D6', '#CBE2DC']} style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent onPerssDrawer={() => navigation.openDrawer()} />
        <ContainerStyled>
          <View style={{marginHorizontal: 30}}>
            <BoldLabelTitle text={'지갑'} style={{marginTop: 27.5}} />
            <BoldLabelSubTitle
              text={'TOTAL PORTFOLIL VALUE'}
              style={{marginTop: 13}}
            />
            <ImageBackground
              source={require('../../asssets/images/ShoppingMall/cardBackground.png')}
              resizeMode="cover"
              style={styles.cardBackground}
            />
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default WalletKsp;

const styles = StyleSheet.create({
  cardBackground: {
    height: 180,
    marginTop: 33,
    marginBottom: 20,
    elevation: 7,
  },
});
