import React from 'react';
import {View, Text} from 'react-native';

const PageNumbering = ({numId, pageNum, pastNum, pastNum2}) => {
  return (
    <Text
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor:
          numId === pageNum
            ? '#46A0BD'
            : numId === pastNum
            ? '#c4c4c4'
            : numId === pastNum2
            ? '#c4c4c4'
            : '#fff',
        textAlign: 'center',
        borderWidth: 1,
        borderColor:
          numId === pastNum
            ? '#c4c4c4'
            : numId === pastNum2
            ? '#c4c4c4'
            : '#46A0BD',
        color:
          numId === pageNum
            ? '#fff'
            : numId === pastNum
            ? '#fff'
            : numId === pastNum2
            ? '#fff'
            : '#46A0BD',
        fontWeight: '700',
        marginLeft: 10,
      }}>
      {numId}
    </Text>
  );
};

export default PageNumbering;
