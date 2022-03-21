import styled from 'styled-components/native';
export const Container = styled.View`
  padding-vertical: 20px;
  padding-horizontal: 19px;
  background: #fff;
  margin-top: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  //border-radius: 20px 20px 0px 0px;
`;
export const CalendarRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
export const DatesContainer = styled.View`
  height: 52px;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 40px;
  margin-bottom: 14px;
  position: relative;
`;
export const SelectText = styled.Text`
  font-size: 18px;
  line-height: 26px;
  font-weight: 700;
  letter-spacing: -0.3px;
  color: #46a0bd;
  margin: 0px 32px;
`;
export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 12px;
  margin-top: 30px;
`;
export const Days = styled.Text`
  font-size: 12px;
  line-height: 24px;
  align-items: center;
  text-align: center;
  letter-spacing: 0.12px;
  color: ${props => (props.isSunday ? '#FF0000' : '#555555')};
`;
export const DateNumber = styled.Text`
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.3px;
  color: ${props =>
    props.color ? props.color : props.isholiday ? '#FF3A3A' : '#555555'};
`;
export const HasCheckImage = styled.Image`
  position: absolute;
  width: 80%;
  height: 80%;
  z-index: -1;
`;
