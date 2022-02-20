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
  BoldLabel16,
} from '../../components/Labels';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import ColumnView from '../../components/Views/Column';
import RowView from '../../components/Views/RowView';
import Touchable from '../../components/Touchable';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';

const WalletKsp = ({navigation}) => {
  const [isKspc, setIsKspc] = useState(1000);
  const [walletAddress, setWalletAddress] = useState(
    '0xQ231h2345yfE2001d8a9g9im8730h8a0s',
  );

  const DATAES_COIN_SEND = [
    {
      id: 1,
      titie: 'KSPC 보내기',
      img: require('../../asssets/icons/WalletKsp/wallet_kspc.png'),
      path: 'KspSend',
    },
    {
      id: 1,
      titie: '이더리움 보내기',
      img: require('../../asssets/icons/WalletKsp/wallet_ethereum.png'),
      path: 'EtherSend',
    },
    {
      id: 1,
      titie: '스테이킹',
      img: require('../../asssets/icons/WalletKsp/wallet_staking.png'),
      path: 'StackingApply',
    },
  ];

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

            {/* 지갑 주소 복사 버튼 start*/}

            <View style={styles.walletCopyBox}>
              <View style={styles.touchBackground}>
                <Touchable style={styles.walletCopyTouch}>
                  <LabelNone
                    text={'지갑 주소 복사'}
                    style={styles.walletCopyText}
                  />
                  <Image
                    source={require('../../asssets/icons/walletAddressCopyIcon.png')}
                    style={styles.walletCopyIcon}
                  />
                </Touchable>
              </View>
            </View>
            {/* 지갑 주소 복사 버튼 end*/}

            {DATAES_COIN_SEND.map((item, index) => (
              <Touchable
                key={index}
                style={{marginTop: 15}}
                onPress={() => navigation.navigate(item?.path)}>
                <RowView style={styles.sendBox}>
                  <RowView style={{marginLeft: 23}}>
                    <Image
                      source={item.img}
                      resizeMode="contain"
                      style={styles.bottomIcons}
                    />
                    <BoldLabel16 text={item.titie} style={styles.boldLabel16} />
                  </RowView>

                  <AntDesign
                    name={'right'}
                    size={8}
                    style={{marginRight: 25, color: '#46A0BD'}}
                  />
                </RowView>
              </Touchable>
            ))}
          </View>
        </ContainerStyled>
      </ScrollView>
    </LinearGradient>
  );
};

export default WalletKsp;

const styles = StyleSheet.create({
  boldLabel16: {fontWeight: '500', color: '#46A0BD'},
  bottomIcons: {width: 24, height: 24, marginRight: 13},
  sendBox: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  walletCopyIcon: {height: 17, width: 17, marginLeft: 5.83},
  walletCopyTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#555555',
    width: SCREEN_WIDTH * 0.347,
    height: 37,
    borderRadius: 20,
    justifyContent: 'center',
  },
  walletCopyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 17,
  },
  walletCopyBox: {
    backgroundColor: '#C4C4C4',
    width: SCREEN_WIDTH * 0.347,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 15,
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
