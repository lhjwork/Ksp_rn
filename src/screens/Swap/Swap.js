import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, Image, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {
  BoldLabelSubTitle,
  BoldLabelTitle,
  LabelNone,
} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {AmountInput} from '../../components/TxInput';
import {BottomButton} from '../../components/Buttons/Buttons';
import {SCREEN_HEIGHT} from '../../constants';
import {useSelector} from 'react-redux';
import api from '../../api';
import {config} from '../../constant';
import {useIsFocused} from '@react-navigation/native';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import {saveUserInfo} from '../../redux/authSlice';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Touchable from '../../components/Touchable';

const Swap = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const [balance, setBalance] = useState([]);
  const [pointCount, setPointCount] = useState(0);
  const isFocused = useIsFocused();
  const [isErrShow, setIsErrShow] = useState(false);
  const [errText, setErrText] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCovertKspToKspc, setIsCovertKspToKspc] = useState(true);

  useEffect(() => {
    setPointCount(0);
    let body = {sessionToken};
    (async () => {
      try {
        const {data} = await api.post('balance', JSON.stringify(body), config);
        setBalance(data?.result);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [isFocused]);

  const onClickChangePoint = async () => {
    setIsDisabled(true);
    if (pointCount === 0 || pointCount.length === 0) {
      await setErrText(
        isCovertKspToKspc ? 'KSPC를 입력해주세요' : 'KSP를 입력해주세요',
      );
      setIsErrShow(true);
      return;
    }
    if (isCovertKspToKspc) {
      if (pointCount > Number(balance?.ksp)) {
        await setErrText('보유한 KSP를 초과할 수없습니다');
        setIsErrShow(true);
        return;
      }
    } else {
      if (pointCount > Number(balance?.kspc)) {
        await setErrText('보유한 KSPC를 초과할 수없습니다');
        setIsErrShow(true);
        return;
      }
    }
    let body = {
      sessionToken,
      // point: pointCount,
    };
    if (isCovertKspToKspc) {
      body.point = pointCount;
    } else {
      body.coin = pointCount;
    }
    let url = isCovertKspToKspc ? 'convertcoin' : 'convert';

    try {
      const {data} = await api.post(url, JSON.stringify(body), config);
      await setErrText('포인트 전환에 성공하셨습니다!');
      navigation.goBack();
      setIsErrShow(true);
    } catch (e) {
      console.log(e);
      if (e?.response?.data?.errMsg) {
        await setErrText(e.response.data.errMsg);
        setIsErrShow(true);
        return;
      }
      await setErrText('포인트 전환에 실패했습니다.');
      setIsErrShow(true);
    }
  };

  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1}}>
      <TrueModalFrame
        infoText={errText}
        visible={isErrShow}
        onPress={() => {
          setIsDisabled(false);
          setIsErrShow(false);
        }}
      />
      <HeaderCompnent
        onPressLeftBtn={() => navigation.goBack()}
        onPerssDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{marginHorizontal: 24, flex: 1}}>
          <BoldLabelTitle text={'스왑'} style={{marginTop: 27.5}} />
          <BoldLabelSubTitle
            text={'TOTAL PORTFOLIO VALUE'}
            style={{marginTop: 13}}
          />
          <RowView style={styles.kspPointBox}>
            <Image
              source={require('../../asssets/images/white_circle_in_logo.png')}
              style={{width: 73, height: 73}}
              resizeMode="contain"
            />
            <LabelNone
              text={(isCovertKspToKspc ? balance?.ksp : balance?.kspc)
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              style={styles.kspPoint}
            />
            <LabelNone
              text={isCovertKspToKspc ? 'KSP' : 'KSPC'}
              style={styles.KspUnit}
            />
          </RowView>
          <RowView style={{justifyContent: 'center', marginTop: 19}}>
            <Touchable
              onPress={() => {
                setPointCount(0);
                setIsCovertKspToKspc(!isCovertKspToKspc);
              }}>
              <Icon name="swap-vertical" color="#fff" size={40} />
            </Touchable>
          </RowView>
          <AmountInput
            placeholder={'수량을 입력해주세요.'}
            textStyle={{marginLeft: 19}}
            rightText={isCovertKspToKspc ? 'KSPC' : 'KSP'}
            rightTextStyle={{marginRight: 16}}
            outStyle={{marginTop: 26}}
            value={pointCount}
            onChangeText={setPointCount}
          />
          <LabelNone
            text={
              '[유의사항]\n\n' +
              '\t• 개인정보 입력에 유의해주세요.\n' +
              '\t• KSPC :이외의 주소는 전송되지 않습니다.\n' +
              '\t• KSPC를 전송할 경우에는 이더리움 가스비가 필요합니다.\n' +
              '\t• 미리 이더리움을 충전해주세요.'
            }
            style={{
              fontSize: 12,
              color: '#fff',
              fontWeight: '700',
              marginBottom: 26,
              marginTop: SCREEN_HEIGHT * 0.17,
            }}
          />
          <BottomButton
            disabled={isDisabled}
            style={styles.bottomBtnPosition}
            text={'포인트 전환'}
            onPress={onClickChangePoint}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Swap;

const styles = StyleSheet.create({
  bottomBtnPosition: {marginBottom: 15},
  kspPoint: {fontSize: 30, color: '#fff', fontWeight: '700'},
  KspUnit: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 23,
    color: '#fff',
    // marginLeft: 41,
    marginRight: 9,
  },
  kspPointBox: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF',
    marginTop: 37,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
});
