import React from 'react';

import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import {BoldLabelSubTitle} from '../Labels';
import {useNavigation} from '@react-navigation/native';

const DeliveryTrackingButton = ({style, t_invoice, t_code}) => {
  const navigation = useNavigation();
  return (
    <SearchButton
      style={style}
      onPress={() => {
        navigation.navigate('DeliveryTracking', {
          t_invoice,
          t_code,
        });
      }}>
      <BoldLabelSubTitle
        text={'배송 조회'}
        style={{textAlign: 'center', color: '#94D2E9'}}
      />
    </SearchButton>
  );
};

export default DeliveryTrackingButton;
export const SearchButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: #94d2e9;
  padding-vertical: 10px;
  margin-top: 14px;
`;
