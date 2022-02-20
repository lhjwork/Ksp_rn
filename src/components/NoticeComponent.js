import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {LabelNone} from './Labels';
import AntDesign from 'react-native-vector-icons/AntDesign';

const NoticeComponent = ({text, outStyle, textStyle, noneIcon = false}) => {
  return (
    <View
      style={{
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 9,
        paddingHorizontal: 27,
        elevation: 5,
        ...outStyle,
      }}>
      <LabelNone
        text={text}
        style={{
          color: '#fff',
          fontSize: 12,
          lineHeight: 16,
          textAlign: 'center',
          fontWeight: '400',
          ...textStyle,
        }}
      />
      {noneIcon === true ? (
        <Image
          source={require('../asssets/icons/walletAddressCopyIcon.png')}
          style={{width: 17, height: 17}}
        />
      ) : null}
    </View>
  );
};

export default NoticeComponent;

const styles = StyleSheet.create({});
