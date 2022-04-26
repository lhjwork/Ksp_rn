import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';

import Touchable from '../Touchable';
import {LabelNone} from '../Labels';
import RowView from '../Views/RowView';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export const BottomButton = ({
  textStyle,
  onPress,
  text,
  style,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
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
          ...textStyle,
          fontSize: 18,
          lineHeight: 26,
          color: !textStyle ? '#fff' : textStyle?.color,
          textAlign: 'center',
          fontWeight: '700',
        }}
      />
    </TouchableOpacity>
  );
};

export const SmallButton = ({
  onPress,
  text,
  style,
  eventStyle,
  isDisabled,
  textStyle,
}) => {
  return (
    <Touchable
      disabled={isDisabled}
      onPress={onPress}
      style={{
        paddingVertical: 13,
        borderRadius: 20,
        backgroundColor: isDisabled ? '#C4C4C4' : '#FFFFFF',
        borderWidth: 1,
        borderColor: isDisabled ? 'transparent' : '#46A0BD',
        width: 86,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <LabelNone
        text={text}
        style={{
          fontSize: 14,
          lineHeight: 18,
          color: isDisabled ? '#fff' : '#46A0BD',
          textAlign: 'center',
          fontWeight: '700',
          ...textStyle,
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
  disabled = false,
  textStyle,
  iconStyle,
}) => {
  return (
    <Touchable
      disabled={disabled}
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
            ...textStyle,
          }}
        />
        <Ionicons
          name={iconName}
          size={24}
          style={{color: '#fff', ...iconStyle}}
        />
      </RowView>
    </Touchable>
  );
};

export const ModalBottomButton = ({onPress, text, style}) => {
  return (
    <Touchable
      onPress={onPress}
      style={{
        paddingVertical: 7.5,
        borderRadius: 20,
        backgroundColor: '#46A0BD',
        width: width - 80,
        ...style,
        // position: 'absolute', width: width-48, bottom: 32,
      }}>
      <LabelNone
        text={text}
        style={{
          fontSize: 14,
          lineHeight: 20,
          color: '#fff',
          textAlign: 'center',
          fontWeight: '700',
        }}
      />
    </Touchable>
  );
};
