import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabelTitle, LabelNone, BoldLabel14} from '../../components/Labels';
import RowView from '../../components/Views/RowView';
import {AmountInput, NoneInput} from '../../components/TxInput';
import {BottomButton, SmallButton} from '../../components/Buttons/Buttons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {TableContainer, CalendarInformation} from './styles';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../constants';
import TrueModalFrame from '../../components/Modals/TrueModalFrame';
import {useIsFocused} from '@react-navigation/native';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';

const StackingApply = ({navigation}) => {
  const isFocused = useIsFocused();
  const [interest, setInterest] = useState('start');
  const [sumInput, onChangeSumInput] = useState('');
  const [isErrShow, setIsErrShow] = useState(false);
  const [errText, setErrText] = useState('');
  const [balance, setBalance] = useState([]);
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;

  let interestInforFirst =
    interest === 'start' ? 560000 : parseInt(parseInt(interest) * 0.07);
  let interestInforTwo =
    interest === 'start' ? 560000 : parseInt(parseInt(interest) * 0.07);
  let interestInforThree =
    interest === 'start' ? 560000 : parseInt(parseInt(interest) * 0.07);
  let interestInforFour =
    interest === 'start' ? 795000 : parseInt(parseInt(interest) * 0.07);
  let totals =
    interestInforTwo +
    interestInforFour +
    interestInforThree +
    interestInforFirst;

  let calendarData = [
    ['분기', '모집기간', '지급이자(7%)', '모집수량', '지급일자'],
    [
      '1',
      '01.01-01.10',
      interestInforFirst?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      '8,000,000',
      '04.10',
    ],
    [
      '2',
      '04.01-04.10',
      interestInforTwo?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      '8,000,000',
      '07.10',
    ],
    [
      '3',
      '07.01-07.10',
      interestInforThree?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      '8,000,000',
      '10.10',
    ],
    [
      '4',
      '10.01-10.10',
      interestInforFour?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      '11,375,140',
      '01.10',
    ],
    [
      'Total',
      '',
      totals?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      '35,375,140',
      '',
    ],
  ];
  const onClickSum = async () => {
    if (sumInput.length === 0) {
      setErrText('수량을 입력해주세요');
      await setInterest('start');
      setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) < 1000) {
      await setErrText('1000 이상만 가능합니다');
      setIsErrShow(true);
      return;
    }
    setInterest(sumInput);

    try {
      setErrText('계산 완료');
    } catch (e) {
      setErrText('계산 실패');
    } finally {
      setIsErrShow(true);
    }
  };
  useEffect(() => {
    getBalance();
    setInterest('start');
    onChangeSumInput('');
  }, [isFocused]);

  const getBalance = async () => {
    let body = {sessionToken};
    try {
      const {data} = await api.post('balance', JSON.stringify(body), config);
      console.log(data);
      setBalance(data?.result);
    } catch (e) {
      console.log(e);
    }
  };
  const fetchStaking = async () => {
    if (sumInput.length === 0) {
      await setErrText('수량을 입력해주세요');
      setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) < 1000) {
      await setErrText('1000 이상만 가능합니다');
      setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) > balance?.ksp) {
      await setErrText('보유하신 KSP 를 초과하셨습니다');
      setIsErrShow(true);
      return;
    }
    try {
      let body = {sessionToken: sessionToken, amount: Number(sumInput)};
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await api.post('staking', JSON.stringify(body), config);
      await setErrText('스테이킹을 완료!');
      setIsErrShow(true);
      navigation.goBack();
    } catch (err) {
      if (err?.response?.data?.errMsg) {
        await setErrText(err.response.data.errMsg);
        setIsErrShow(true);
        return;
      }
      Alert.alert('서버와 통신에 실패');
      console.log('err', err);
      console.log('err', err.respon);
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
        onPress={() => setIsErrShow(false)}
      />
      <ScrollView>
        <HeaderCompnent
          onPressLeftBtn={() => navigation.goBack()}
          onPerssDrawer={() => navigation.openDrawer()}
        />
        <View style={{marginHorizontal: 24, flex: 1}}>
          <BoldLabelTitle
            text={'KSP - 스테이킹 신청'}
            style={{marginTop: 27.5, marginBottom: 33}}
          />
          <RowView style={{marginTop: 5}}>
            <AmountInput
              value={sumInput}
              outStyle={{flex: 1}}
              rightText={'KSP'}
              placeholder="수량을 입력해주세요."
              textStyle={{marginLeft: 19}}
              onChangeText={onChangeSumInput}
            />
            <SmallButton
              style={styles.button}
              text={'계산'}
              onPress={() => {
                onClickSum();
              }}
            />
          </RowView>
          <LabelNone
            text={'최소 신청 수량은 1,000KSP 입니다.'}
            style={styles.onlyNumber}
          />
          <RowView>
            <FontAwesome
              name={'exclamation-triangle'}
              size={20}
              style={styles.exclamationStyle}
            />
            <BoldLabel14
              text={'스테이킹 안내사항'}
              style={styles.exclamationText}
            />
            <View style={{height: 1, backgroundColor: '#DF8600', flex: 1}} />
          </RowView>
          <BoldLabel14
            text={
              '\t• 기준 : 매 분기 1회 진행\n' +
              '\t• 년간 총 4회 (리워드 풀 매년 수량의 5% 책정)\n' +
              '\t• 2022년 1분기 터치-스테이킹이 아래와 같이 시작됩니\n\t\t다.\n' +
              '\t• 신청기간 : 2022년 01월 01일 ~ 01월 10일\n' +
              '\t• 최소 신청수량 : 1,000 Ksp\n' +
              '\t• 지급(예상)이자 : 7%\n' +
              '\t• 이자 지급 계산은 위의 표를 참고해주시길 바랍니다.'
            }
            style={styles.noticeText}
          />
        </View>

        <View style={styles.bottomBox}>
          <TableContainer>
            <FlatList
              data={calendarData}
              renderItem={calendarRender}
              keyExtractor={(item, index) => index.toString()}
            />
          </TableContainer>
          <View style={{marginHorizontal: 24}}>
            <LabelNone
              text={'최소 신청 수량은 1,000KSP 입니다.'}
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '700',
                lineHeight: 17,
                color: '#46A0BD',
                marginBottom: 9,
              }}
            />
            <BottomButton
              text={'신청하기'}
              onPress={() => {
                fetchStaking();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default StackingApply;

const calendarRender = ({item, index}) => {
  return (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        borderBottomColor: '#aaa',

        borderBottomWidth:
          index === 0 ? 1 : index === 4 ? 1 : index === 5 ? 1 : 0,
      }}>
      <CalendarInformation total={true} color={index === 5} style={{flex: 0.1}}>
        {item[0]}
      </CalendarInformation>

      <CalendarInformation style={{flex: 0.275}}>{item[1]}</CalendarInformation>
      <CalendarInformation style={{flex: 0.265}} color={index === 5}>
        {item[2]}
      </CalendarInformation>
      <CalendarInformation style={{flex: 0.2}} color={index === 5}>
        {item[3]}
      </CalendarInformation>
      <CalendarInformation style={{flex: 0.16}}>{item[4]}</CalendarInformation>
    </View>
  );
};

const styles = StyleSheet.create({
  tableTitleText: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    flex: 1,
    marginHorizontal: 9,
  },
  bottomBox: {
    height: SCREEN_HEIGHT * 0.49,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  noticeText: {
    color: '#000',
    marginTop: 9,
    paddingBottom: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#DF8600',
    marginBottom: 22,
  },
  exclamationText: {
    color: '#DF8600',
    fontWeight: '700',
    marginRight: 9,
    marginLeft: 5.1,
  },
  exclamationStyle: {color: '#DF8600'},
  button: {marginLeft: 5},
  onlyNumber: {
    color: '#46A0BD',
    fontSize: 12,
    lineHight: 16,
    marginLeft: 9,
    marginTop: 5,
    marginBottom: 27,
  },
});
