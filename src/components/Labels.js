import React from 'react';
import { Text } from 'react-native';

export const LabelNone = ({
  text,
  style,
  numberOfLines = 0,
  ellipsizeMode,
}) => (
  <Text
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
    style={{ ...style }}
  >
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
    style={{ ...style }}
    numberOfLines={numberOfLines}
    ellipsizeMode={ellipsizeMode}
  >
    {text}
  </Text>
);
