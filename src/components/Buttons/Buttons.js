import React from 'react';
import {Dimensions} from 'react-native';

import Touchable from '../Touchable';
import {LabelNone} from '../Labels';
import RowView from '../Views/RowView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export const BottomButton = ({onPress, text, style}) => {
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

export const SmallButton = ({onPress, text, style, eventStyle}) => {
  return (
    <Touchable
      onPress={onPress}
      style={{
        paddingVertical: 13,
        borderRadius: 20,
        backgroundColor: '#46A0BD',
        width: 86,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <LabelNone
        text={text}
        style={{
          fontSize: 14,
          lineHeight: 18,
          color: '#fff',
          textAlign: 'center',
          fontWeight: '700',
        }}
      />
    </Touchable>
  );
};

export const BottomButtonWithIcon = ({
  onPress,
  text,
  style,
  iconName,
  iconSize,
}) => {
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
      <RowView style={{justifyContent: 'center'}}>
        <LabelNone
          text={text}
          style={{
            fontSize: 18,
            lineHeight: 26,
            color: '#fff',
            fontWeight: '700',
            marginRight: 5,
          }}
        />
        <Ionicons name={iconName} size={24} style={{color: '#fff'}} />
      </RowView>
    </Touchable>
  );
};
