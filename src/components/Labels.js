import React from 'react';
import {Text, StyleSheet} from 'react-native';

export const LabelNone = ({text, style, numberOfLines = 0, ellipsizeMode}) => (
  <Text
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
    style={{...style}}>
    {text}
  </Text>
);

export const NormalBoldLabel = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabelTitle = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.titleLabel, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabelSubTitle = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.subTitleLabel, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabel20 = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.boldLabel20, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabel16 = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.boldLabel16, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabel14 = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.boldLabel14, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);

export const BoldLabel18 = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    style={{...styles.boldLabel18, ...style}}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}>
    {text}
  </Text>
);
const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 28,
    color: '#000000',
  },
  subTitleLabel: {
    fontSize: 14,
    lineHeight: 18,
    color: '#555555',
    fontWeight: '400',
  },
  boldLabel20: {fontSize: 20, fontWeight: '700'},
  boldLabel16: {fontSize: 16, fontWeight: '700'},
  boldLabel14: {fontSize: 14, fontWeight: '500', color: '#fff', lineHeight: 18},
  boldLabel18: {fontSize: 18, fontWeight: '700', color: '#555', lineHeight: 22},
});
