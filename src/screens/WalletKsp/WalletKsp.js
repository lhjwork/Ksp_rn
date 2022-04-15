import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  Clipboard,
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
import {SCREEN_WIDTH} from '../../constants';
import RowView from '../../components/Views/RowView';
import Touchable from '../../components/Touchable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../api';
import {saveWallet} from '../../redux/authSlice';
import ToastMsg from '../../components/toastMsg';
import {config} from '../../constant';
const WalletKsp = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const hasWallet = auth.walletAddress !== null;
  const [isDisabled, setIsDisabled] = useState(false);
  const toastRef = useRef(null);
  const [balance, setBalance] = useState([]);
  useEffect(() => {
    if (hasWallet) {
      let body = {sessionToken};
      (async () => {
        try {
          const {data} = await api.post(
            'balance',
            JSON.stringify(body),
            config,
          );
          setBalance(data?.result);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, [hasWallet]);
  const showToast = useCallback(() => {
    toastRef.current.show('지갑 주소가 복사 되었습니다.');
  }, []);

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
      path: 'KspSend',
    },
    {
      id: 1,
      titie: '스테이킹',
      img: require('../../asssets/icons/WalletKsp/wallet_staking.png'),
      path: 'StackingApply',
    },
  ];

  const onClickHandler = async () => {
    setIsDisabled(false);
    if (hasWallet) {
      Clipboard.setString(auth?.walletAddress);
      showToast();
      setIsDisabled(false);
    } else {
      console.log('tets');
      let body = {sessionToken: sessionToken};
      const config = {
        headers: {'Content-Type': 'application/json'},
      };
      try {
        const res = await api.post(
          'createwallet',
          JSON.stringify(body),
          config,
        );
        dispatch(saveWallet(res?.data?.result));
        console.log('res', res?.data);
      } catch (e) {
        console.log(e);
        console.log(e.response);
      } finally {
        setIsDisabled(false);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          <HeaderCompnent
            onPerssDrawer={() => navigation.openDrawer()}
            onPressLeftBtn={() => navigation.goBack()}
          />
          <ContainerStyled>
            <View style={{marginHorizontal: 30}}>
              <BoldLabelTitle text={'지갑'} style={{marginTop: 27.5}} />
              <BoldLabelSubTitle
                text={'TOTAL PORTFOLIO VALUE'}
                style={{marginTop: 13}}
              />
              <ImageBackground
                source={require('../../asssets/images/ShoppingMall/cardBackground.png')}
                resizeMode="cover"
                style={styles.cardBackground}>
                <RowView style={styles.walletPoint}>
                  <View
                    style={{
                      ...styles.centerText,
                      transform: [
                        {translateX: hasWallet ? -15 : 6},
                        {translateY: hasWallet ? 0 : -5},
                      ],
                    }}>
                    {hasWallet ? (
                      <BoldLabel20
                        text={balance?.kspc
                          ?.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        style={{color: '#46A0BD'}}
                      />
                    ) : (
                      <BoldLabel20
                        text={'-'}
                        style={{fontSize: 38, lineHeight: 43, color: '#333333'}}
                      />
                    )}
                  </View>
                  <LabelNone text={'KSPC'} style={styles.kspcUnit} />
                </RowView>
                {hasWallet ? (
                  <LabelNone
                    text={auth?.walletAddress}
                    style={styles.walletAddress}
                    Path
                  />
                ) : (
                  <LabelNone text={''} style={styles.walletAddress} Path />
                )}
              </ImageBackground>

              {/* 지갑 주소 복사 버튼 start*/}
              {/*hasWalletCopyBox*/}
              <View
                style={
                  hasWallet ? styles.walletCopyBox : styles.hasWalletCopyBox
                }>
                {/*<View style={styles.touchBackground}>*/}
                <Touchable
                  onPress={onClickHandler}
                  disabled={isDisabled}
                  style={
                    hasWallet
                      ? styles.walletCopyTouch
                      : styles.hasWalletCopyTouch
                  }>
                  <LabelNone
                    text={hasWallet ? '지갑 주소 복사' : '지갑 생성 하기'}
                    style={styles.walletCopyText}
                  />
                  <Image
                    source={
                      hasWallet
                        ? require('../../asssets/icons/walletAddressCopyIcon.png')
                        : require('../../asssets/icons/Wallet_alt.png')
                    }
                    style={styles.walletCopyIcon}
                  />
                </Touchable>
                {/*</View>*/}
              </View>
              {/* 지갑 주소 복사 버튼 end*/}

              {DATAES_COIN_SEND.map((item, index) => (
                <WalletButtons
                  key={index}
                  Title={item?.titie}
                  onPress={() =>
                    navigation.navigate(item?.path, {
                      balance,
                      isKspSend: item?.titie.includes('KSPC'),
                    })
                  }
                  Img={item?.img}
                />
              ))}
              {/*{createWalletAddress === true ? (*/}
              {/*  <></>*/}
              {/*) : (*/}
              {/*  <WalletButtons*/}
              {/*    style={{marginBottom: 15}}*/}
              {/*    Title={'지갑생성'}*/}
              {/*    onPressBoolean={true}*/}
              {/*    Img={require('../../asssets/icons/Wallet_alt_blue.png')}*/}
              {/*    onPress={() => {*/}
              {/*      setIsKspc('1000');*/}
              {/*      setCreateWalletAddress(true);*/}
              {/*    }}*/}
              {/*  />*/}
              {/*)}*/}
            </View>
          </ContainerStyled>
        </ScrollView>
        <ToastMsg ref={toastRef} />
      </SafeAreaView>
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
  hasWalletCopyTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#46A0BD',
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
  hasWalletCopyBox: {
    backgroundColor: '#46A0BD',
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
  centerText: {
    left: '50%',
    position: 'absolute',
  },
  walletPoint: {
    position: 'relative',
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

const WalletButtons = ({Img, Title, onPress, style}) => {
  return (
    <Touchable style={{marginTop: 15, ...style}} onPress={onPress}>
      <RowView style={styles.sendBox}>
        <RowView style={{marginLeft: 23}}>
          <Image source={Img} resizeMode="contain" style={styles.bottomIcons} />
          <BoldLabel16 text={Title} style={styles.boldLabel16} />
        </RowView>

        <AntDesign
          name={'right'}
          size={8}
          style={{marginRight: 25, color: '#46A0BD'}}
        />
      </RowView>
    </Touchable>
  );
};
