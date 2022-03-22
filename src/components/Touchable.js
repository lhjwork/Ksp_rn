import React from 'react';
import {TouchableOpacity, View} from 'react-native';

const Touchable = ({children, onPress, style, disabled = false}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={{...style}}>{children}</View>
    </TouchableOpacity>
  );
};

export default Touchable;
