import React, {useState} from 'react';
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
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
  BoldLabel20,
} from '../../components/Labels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import ColumnView from '../../components/Views/Column';
import RowView from '../../components/Views/RowView';
import Touchable from '../../components/Touchable';
const WalletKsp = ({navigation}) => {
  const [isKspc, setIsKspc] = useState(1000);
  const [walletAddress, setWalletAddress] = useState(
    '0xQ231h2345yfE2001d8a9g9im8730h8a0s',
  );

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
              style={styles.cardBackground}>
              <RowView style={styles.walletPoint}>
                <BoldLabel20
                  text={isKspc
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  style={{color: '#46A0BD'}}
                />
                <LabelNone text={'KSPC'} style={styles.kspcUnit} />
              </RowView>
              <LabelNone text={walletAddress} style={styles.walletAddress} />
            </ImageBackground>
            <View style={styles.walletCopyBox}>
              <View style={styles.touchBackground}>
                <Touchable
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#555555',
                    width: SCREEN_WIDTH * 0.347,
                    height: 37,
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  <LabelNone
                    text={'지갑 주소 복사'}
                    style={styles.walletCopyText}
                  />
                  <Image
                    source={require('../../asssets/icons/walletAddressCopyIcon.png')}
                    style={{height: 17, width: 17, marginLeft: 5.83}}
                  />
                </Touchable>
              </View>
            </View>
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default WalletKsp;

const styles = StyleSheet.create({
  walletCopyText: {color: '#fff'},
  walletCopyBox: {
    backgroundColor: '#C4C4C4',
    width: SCREEN_WIDTH * 0.347,
    borderRadius: 20,
    alignSelf: 'center',
  },
  touchBackground: {
    backgroundColor: '#C4C4C4',
    width: SCREEN_WIDTH * 0.347,
    borderRadius: 20,
  },
  cardBackground: {
    height: 180,
    marginTop: 33,
    marginBottom: 20,
    elevation: 7,
  },
  walletPoint: {
    marginTop: 67,
    justifyContent: 'flex-end',
    marginRight: SCREEN_WIDTH * 0.08,
    alignItems: 'baseline',
  },
  kspcUnit: {
    marginLeft: SCREEN_WIDTH * 0.136,
    fontSize: 18,
    lineHeight: 26.06,
    color: '#333333',
    fontWeight: '400',
  },
  walletAddress: {
    marginTop: 43,
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 17.38,
    color: '#94D2E9',
  },
});
