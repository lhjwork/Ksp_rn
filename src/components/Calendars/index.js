import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import {View, TouchableOpacity, Image} from 'react-native';
import {
  CalendarRow,
  DateContainer,
  DateNumber,
  DatesContainer,
  Days,
  SelectText,
  Container,
  HasCheckImage,
} from './styles';
import dayjs from 'dayjs';

const Calendars = ({setSelectDate, selectDate, attendanceList}) => {
  let weekOfYear = require('dayjs/plugin/weekOfYear');
  dayjs.extend(weekOfYear);
  const today = dayjs(selectDate);

  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();
  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <CalendarRow key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day'); //d로해도되지만 직관성
              // 이번달이 아닌경우
              if (days.format('MM') !== today.format('MM')) {
                return (
                  <DatesContainer key={index}>
                    <DateNumber color={'#CACCD6'}>
                      {days.format('D')}
                    </DateNumber>
                  </DatesContainer>
                );
              }
              // 해당 값이 출석한 날짜에 추가 되어있는 경우
              //   attendanceList.flat()
              else if (attendanceList.includes(days.format('YYYY-MM-DD'))) {
                return (
                  <DatesContainer key={index}>
                    <HasCheckImage
                      resizeMode={'contain'}
                      source={require('../../asssets/images/CalendarImage/hasCheck.png')}
                    />
                    <DateNumber isholiday={index === 0}>
                      {days.format('D')}
                    </DateNumber>
                  </DatesContainer>
                );
              }
              // 이번달의 경우
              else {
                return (
                  <DatesContainer key={index}>
                    <DateNumber isholiday={index === 0}>
                      {days.format('D')}
                    </DateNumber>
                  </DatesContainer>
                );
              }
            })}
        </CalendarRow>,
      );
    }
    return result;
  };
  return (
    <Container>
      <View
        style={{
          marginBottom: 8,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{padding: 4}}
          onPress={() => {
            setSelectDate(
              new Date(selectDate.setMonth(selectDate.getMonth() - 1)),
            );
          }}>
          <Icon name={'chevron-left'} color="#94D2E9" size={20} />
        </TouchableOpacity>
        <SelectText>
          {dayjs(selectDate).get('year') + '년 '}
          {dayjs(selectDate).get('month') + 1 + '월'}
        </SelectText>
        <TouchableOpacity
          style={{padding: 4}}
          onPress={() => {
            setSelectDate(
              new Date(selectDate.setMonth(selectDate.getMonth() + 1)),
            );
          }}>
          <Icon name={'chevron-right'} color="#94D2E9" size={20} />
        </TouchableOpacity>
      </View>
      <DateContainer>
        {Dates.map((date, index) => (
          <Days key={index} isSunday={index === 0}>
            {date}
          </Days>
        ))}
      </DateContainer>
      <View>{calendarArr()}</View>
    </Container>
  );
};
let Dates = ['일', '월', '화', '수', '목', '금', '토'];
export default Calendars;
