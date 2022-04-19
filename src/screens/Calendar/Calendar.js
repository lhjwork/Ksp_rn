import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import HeaderCompnent from '../../components/HeaderCompnent';
import {BoldLabel14, LabelNone} from '../../components/Labels';
import {ContainerStyled} from '../../components/StyledComponents/StyledComponents';
import RowView from '../../components/Views/RowView';
import {SCREEN_HEIGHT} from '../../constants';
import {
  BottomButton,
  BottomButtonWithIcon,
} from '../../components/Buttons/Buttons';
import CalendarTc from '../../components/CalendarTc';
import Calendars from '../../components/Calendars';
import dayjs from 'dayjs';
import api from '../../api';
import {config} from '../../constant';
import {useSelector} from 'react-redux';

const Calendar = ({navigation}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const auth = useSelector(state => state.auth);
  const {sessionToken} = auth?.user;
  const [attendanceList, setAttendanceList] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date());

  useEffect(() => {
    (async () => {
      setIsDisabled(true);
      let body = {sessionToken};
      try {
        const {data} = await api.post(
          'attendancerecord',
          JSON.stringify(body),
          config,
        );
        setAttendanceList(data?.result.map(category => category[1]));
      } catch (e) {
        console.log(e);
        console.log(e.response);
      } finally {
        setIsDisabled(false);
      }
    })();
  }, []);
  const onClickAttendance = async () => {
    if (attendanceList?.includes(dayjs().format('YYYY-MM-DD'))) {
      return;
    }
    let body = {sessionToken, Date: dayjs().format('YYYY-MM-DD')};

    try {
      const {data} = await api.post('attendance', JSON.stringify(body), config);
      let newData = [...attendanceList];
      newData.push(body?.Date);
      setAttendanceList(newData);
    } catch (e) {
      console.log(e);
      console.log(e.response);
    }
  };
  const monthAttendanceCount = () => {
    let newData = [...attendanceList];
    if (newData?.length === 0) {
      return 0;
    }
    return newData?.filter(
      data =>
        dayjs(data).get('month') + 1 === dayjs(selectDate).get('month') + 1,
    ).length;
  };
  return (
    <LinearGradient
      colors={['#91C7D6', '#CBE2DC']}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 0.65}}
      style={{flex: 1}}>
      <ScrollView>
        <HeaderCompnent
          onPerssDrawer={() => navigation.openDrawer()}
          onPressLeftBtn={() => navigation.goBack()}
        />

        <View style={styles.adverBanner}>
          <Image
            source={require('../../asssets/images/ShoppingMall/main_attend_img.png')}
            resizeMode="contain"
            style={{width: '100%', height: SCREEN_HEIGHT * 0.15}}
          />
        </View>
        <View style={styles.checkContainer}>
          <CheckBoxView
            month={dayjs(selectDate).get('month') + 1}
            attendanceCount={monthAttendanceCount()}
          />
          <BottomButtonWithIcon
            disabled={
              attendanceList?.includes(dayjs().format('YYYY-MM-DD')) ||
              isDisabled
            }
            onPress={onClickAttendance}
            text={
              attendanceList?.includes(dayjs().format('YYYY-MM-DD'))
                ? '출석체크 완료!'
                : '출석체크 하기'
            }
            iconName={'checkmark-done'}
            style={{
              marginTop: 24,
              backgroundColor: attendanceList?.includes(
                dayjs().format('YYYY-MM-DD'),
              )
                ? '#FFFFFF'
                : '#46A0BD',
            }}
            textStyle={{
              color: attendanceList?.includes(dayjs().format('YYYY-MM-DD'))
                ? '#C4C4C4'
                : '#FFFFFF',
            }}
            iconStyle={{
              color: attendanceList?.includes(dayjs().format('YYYY-MM-DD'))
                ? '#C4C4C4'
                : '#FFFFFF',
            }}
          />
        </View>
        <Calendars
          selectDate={selectDate}
          setSelectDate={setSelectDate}
          attendanceList={attendanceList}
        />
        {/*<CalendarTc dates={dates} />*/}
      </ScrollView>
    </LinearGradient>
  );
};

export default Calendar;

const CheckBoxView = ({month, attendanceCount}) => {
  return (
    <View>
      <RowView style={styles.attendanceTopBox}>
        <LabelNone text={`${month}월 출석체크`} style={styles.monthText} />
      </RowView>
      <RowView style={styles.attendanceTopBottomBox}>
        <LabelNone text={'출석횟수'} style={styles.attendanceCountText} />
        <LabelNone text={attendanceCount} style={styles.attendanceCount} />
        <LabelNone text={'회'} style={styles.attendanceCountText} />
      </RowView>
    </View>
  );
};

const styles = StyleSheet.create({
  adverBanner: {
    marginTop: 14.5,
    marginBottom: 19,
  },
  checkContainer: {
    marginHorizontal: 24,
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 26,
    paddingVertical: 4.5,
  },
  attendanceCountText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 26,
    color: '#000',
    paddingVertical: 24,
  },
  attendanceCount: {
    fontWeight: '400',
    fontSize: 36,
    lineHeight: 52,
    color: '#46A0BD',
    marginLeft: 20,
    marginRight: 6,
  },
  attendanceTopBox: {
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#94D2E9',
  },
  attendanceTopBottomBox: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
