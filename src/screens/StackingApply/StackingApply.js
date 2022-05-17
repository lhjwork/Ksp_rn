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
   
      await setInterest('start');
      setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) < 1000) {
     setIsErrShow(true);
      return;
    }
    setInterest(sumInput);

  
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
     setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) < 1000) {
     
      setIsErrShow(true);
      return;
    }
    if (parseInt(sumInput) > balance?.ksp) {
     
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
   
      setIsErrShow(true);
      // navigation.goBack();
    } catch (err) {
      console.log(err?.response);
      if (err?.response?.data?.errMsg) {
        await setErrText(err.response.data.errMsg);
        setIsErrShow(true);
        return;
      }
    
      console.log('err', err);
      console.log('err', err.respon);
    }
  };
  const success = async () => {
    await setIsErrShow(false);
    navigation.goBack();
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
        onPress={() =>
          errText === '' ? success() : setIsErrShow(false)
        }
      />
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <HeaderCompnent
          onPressLeftBtn={() => navigation.goBack()}
          onPerssDrawer={() => navigation.openDrawer()}
        />
        <View style={{marginHorizontal: 24, flex: 1}}>
          <BoldLabelTitle
            text={'KSP '}
            style={{marginTop: 27.5, marginBottom: 33}}
          />
          <RowView style={{marginTop: 5}}>
            <AmountInput
              value={sumInput}
              outStyle={{flex: 1, borderWidth: 0, height: 40}}
              rightText={'KSP'}
              placeholder=""
              textStyle={{marginLeft: 19}}
              onChangeText={onChangeSumInput}
            />
            <SmallButton
              style={{...styles.button, paddingVertical: 10, width: 70}}
              textStyle={{color: '#fff', fontSize: 14}}
              text={''}
              onPress={() => {
                onClickSum();
              }}
            />
          </RowView>
          <LabelNone
   
            style={styles.onlyNumber}
          />
          <RowView>
            <FontAwesome
              name={'exclamation-triangle'}
              size={20}
              style={styles.exclamationStyle}
            />
            <BoldLabel14
         
              style={styles.exclamationText}
            />
            <View style={{height: 1, backgroundColor: '#DF8600', flex: 1}} />
          </RowView>
          <BoldLabel14
     
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
        
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: '700',
                // lineHeight: 17,
                color: '#46A0BD',
                marginBottom: 9,
              }}
            />
            <BottomButton
      
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
    // height: SCREEN_HEIGHT * 0.49,
    paddingBottom: 30,
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
  button: {marginLeft: 5, backgroundColor: '#46A0BD', height: 40},
  onlyNumber: {
    color: '#46A0BD',
    fontSize: 12,
    lineHight: 16,
    marginLeft: 9,
    marginTop: 5,
    marginBottom: 27,
  },
});
