import React from 'react';
import {Dimensions} from 'react-native';

import Touchable from '../Touchable';
import {LabelNone} from '../Labels';

const {width} = Dimensions.get('window');

const BottomButton = ({onPress, text, style}) => {
  return (
    <Touchable
      onPress={onPress}
      style={{
        paddingVertical: 13,
        borderRadius: 20,
        backgroundColor: '#46A0BD',
        width: width - 48,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <LabelNone
        text={text}
        style={{
          fontSize: 18,
          lineHeight: 26,
          color: '#fff',
          textAlign: 'center',
          fontWeight: '700',
        }}
      />
    </Touchable>
  );
};

export default BottomButton;
