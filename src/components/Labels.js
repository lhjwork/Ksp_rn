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
    style={{...styles.subtitleLabel, ...style, letterSpacing: 1.6}}
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
    fontWeight: 400,
    lineHeight: 18,
    color: '#555555',
  },
});
