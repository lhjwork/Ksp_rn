import React from 'react';
import {TextInput, StyleSheet, Image, View} from 'react-native';
import RowView from './Views/RowView';
import Touchable from './Touchable';
import {immerable} from 'immer';
import {LabelNone} from './Labels';

export const TitleInput = ({value, onChangeText, style}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor={'#c4c4c4'}
    />
  );
};

export const ContentInput = ({
  value,
  onChangeText,
  outStyle,
  source,
  onChange,
  placeholder,
  textStyle,
  imageNone = false,
}) => {
  return (
    <RowView
      style={{
        width: '100%',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        ...outStyle,
      }}>
      {imageNone === true ? (
        <Image source={source} resizeMode="contain" style={styles.contentImg} />
      ) : (
        <></>
      )}
      <TextInput
        style={{
          width: '100%',
          height: 50,
          color: '#000',
          ...textStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        placeholderTextColor={'#c4c4c4'}
      />
    </RowView>
  );
};

export const AmountInput = ({
  value,
  onChangeText,
  outStyle,
  source,
  onChange,
  placeholder,
  textStyle,
  rightText,
  rightTextStyle,
}) => {
  return (
    <RowView
      style={{
        // width: '100%',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        justifyContent: 'space-between',
        ...outStyle,
      }}>
      <TextInput
        style={{
          height: 50,
          color: '#000',
          ...textStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        keyboardType="number-pad"
        placeholderTextColor={'#c4c4c4'}
      />
      <LabelNone
        text={rightText}
        style={{
          color: '#94D2E9',
          marginRight: 12,
          fontSize: 14,
          lineHeight: 18,
          ...rightTextStyle,
        }}
      />
    </RowView>
  );
};

export const NoneInput = ({
  value,
  onChangeText,
  style,
  source,
  onChange,
  placeholder,
  imageNone,
  textStyle,
}) => {
  return (
    <RowView
      style={{
        width: '100%',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        ...style,
      }}>
      {imageNone === false ? null : (
        <Image source={source} resizeMode="contain" style={styles.contentImg} />
      )}

      <TextInput
        style={{
          height: 50,
          color: '#000',
          ...textStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        placeholderTextColor={'#c4c4c4'}
      />
    </RowView>
  );
};

export const MyInfoInput = ({text, style}) => {
  return (
    <>
      <TextInput
        placeholderTextColor={'#c4c4c4'}
        editable={false}
        value={text}
        textAlign="center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#c4c4c4',
          color: '#555',
          ...style,
        }}
      />
    </>
  );
};

export const PasswordInput = ({
  value,
  onChangeText,
  style,
  onPress,
  ImageSource,
  secureTextEntry,
  source,
  onChange,
  noneImage = false,
  textStyle,
  styleBox,
  placeholder,
  eyeSytle,
}) => {
  return (
    // <TextInput
    //   value={value}
    //   onChangeText={onChangeText}
    //   style={[styles.password, style]}
    // />
    <RowView
      style={{
        width: '100%',
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        justifyContent: 'space-between',
        ...styleBox,
      }}>
      <RowView>
        {noneImage === true ? (
          <Image
            source={require('../asssets/icons/Login/login_password_icon.png')}
            resizeMode="contain"
            style={styles.passwordImg}
          />
        ) : (
          <></>
        )}

        <TextInput
          style={{
            color: '#000',
            width: '73%',
            height: 50,
            ...textStyle,
          }}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          placeholderTextColor={'#c4c4c4'}
          // onBlur={() => Keyboard.dismiss()}
        />
      </RowView>

      <Touchable style={eyeSytle} onPress={onPress}>
        <Image
          source={
            secureTextEntry
              ? require('../asssets/icons/Login/passwrord_hide.png')
              : require('../asssets/icons/Login/password_open.png')
          }
          resizeMode="contain"
          style={{
            width: 24,
            height: 24,
          }}
        />
      </Touchable>
    </RowView>
  );
};

const styles = StyleSheet.create({
  noneInputBox: {
    flex: 1,
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
  contentImg: {marginLeft: 16, marginRight: 12, width: 24, height: 24},
  idTextInput: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
  },
  input: {flex: 1, color: '#000000'},
  content: {color: '#000000', minHeight: 200},
  idTextInput2: {
    width: '100%',
    height: 52,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c4c4c4',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  passwordImg: {
    marginLeft: 16,
    marginRight: 12,
    width: 24,
    height: 24,
  },
  logoText: {
    color: '#fff',
    fontSize: 17.8,
    textAlign: 'center',
  },
});
