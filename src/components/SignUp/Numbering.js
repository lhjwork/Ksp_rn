import React from 'react';
import {View, Text} from 'react-native';

const Numbering = ({numId, pageNum}) => {
  return (
    <Text
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: numId === pageNum ? '#46A0BD' : '#fff',
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#46A0BD',
        color: numId === pageNum ? '#fff' : '#46A0BD',
        fontWeight: '700',
        marginLeft: 10,
      }}>
      {numId}
    </Text>
  );
};

export default Numbering;
