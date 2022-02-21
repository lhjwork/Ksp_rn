import styled from 'styled-components';

export const TableContainer = styled.View`
  margin-top: 30px;
  margin-bottom: 19px;
  padding: 0 10px;
`;

export const CalendarInformation = styled.Text`
  text-align: center;
  padding: 8px 0px;
  font-size: 12px;
  font-weight: ${props => (props.total || props.bold ? 'bold' : 'normal')};
  color: ${props => (props.color ? '#46A0BD' : '#000000')};
`;
