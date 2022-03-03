import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  //   dayNamesShort: ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
  // today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'ko';

const CalendarTc = ({dates}) => {
  const auth = useSelector(state => state.auth);
  const [date, setDate] = useState([]);
  const [arrayDate, setArrayDayes] = useState();

  let markedDay = {};
  dates.map(item => {
    markedDay[item[1]] = {
      selected: true,
      startingDay: true,
      endingDay: true,
      textColor: '#fff',
      color: '#5F408F',
    };
  });
  useEffect(() => {
    // {
    //   for (let i = 0; i <= dates.length; i++) {
    // dates[i][1];
    console.log(dates);
    //   }
    // }
    // setArrayDayes(dates);
  }, []);

  return (
    <Calendar
      style={styles.calendar}
      markingType="period"
      markedDates={markedDay}
      theme={{
        arrowColor: '#6f6f6f',
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: '#555',
          },
          dayTextAtIndex1: {
            color: '#555',
          },
          dayTextAtIndex2: {
            color: '#555',
          },
          dayTextAtIndex3: {
            color: '#555',
          },
          dayTextAtIndex4: {
            color: '#555',
          },
          dayTextAtIndex5: {
            color: '#555',
          },
          dayTextAtIndex6: {
            color: '#555',
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',

            marginTop: 0,
            marginBottom: 16,
            alignItems: 'center',
          },
          monthText: {
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: 22,
            color: '#46A0BD',
          },
          arrow: {
            padding: 5,
          },
          dayHeader: {
            marginVertical: 9,
            fontSize: 14,
            lineHeight: 18,
            color: '#fff',
            fontWeight: 'bold',
          },
          weekText: {color: '#000'},
          week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            //   backgroundColor: '#5F408F',
          },
          day: {fontSize: 14, fontWeight: '400', lineHeight: 20},
        },
        disabledArrowColor: '#adadad',
        todayTextColor: '#5F408F',
      }}
      minDate={dayjs(new Date()).format('YYYY-MM-DD')}
      monthFormat={'M월'}
      onMonthChange={month => {
        console.log('month changed', month);
      }}

      // enableSwipeMonths={true}
    />
  );
};

export default CalendarTc;

const styles = StyleSheet.create({
  calendar: {
    marginTop: 20,
    borderRadius: 10,
    paddingTop: 20,
  },
});
