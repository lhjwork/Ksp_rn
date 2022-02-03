import React from 'react';
import {View} from 'react-native';

const ColumnView = ({children, style}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        ...style,
      }}>
      {children}
    </View>
  );
};

export default ColumnView;
