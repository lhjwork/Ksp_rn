import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export const TitleInput = ({ value, onChangeText, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export const ContentInput = ({ value, onChangeText, style }) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      style={[styles.content, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: { flex: 1, color: '#000000' },
  content: { color: '#000000', minHeight: 200 },
});
