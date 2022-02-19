import React from 'react';
import {TextInput, StyleSheet, Image} from 'react-native';
import RowView from './Views/RowView';
import Touchable from './Touchable';
import {immerable} from 'immer';

export const TitleInput = ({value, onChangeText, style}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export const ContentInput = ({
  value,
  onChangeText,
  style,
  source,
  onChange,
  placeholder,
  textStyle,
  imageNone = true,
}) => {
  return (
    <RowView style={styles.idTextInput}>
      {imageNone === true ? (
        <Image source={source} resizeMode="contain" style={styles.contentImg} />
      ) : (
        <></>
      )}

      <TextInput
        style={{
          width: '100%',
          height: 50,
          ...textStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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
    <RowView style={styles.noneInputBox}>
      {imageNone === false ? null : (
        <Image source={source} resizeMode="contain" style={styles.contentImg} />
      )}

      <TextInput
        style={{
          height: 50,
          ...textStyle,
        }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </RowView>
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
  passwordImgVisible,
  booleans,
  noneImage = true,
  textStlye,
  styleBox,
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
            width: '73%',
            height: 50,
            ...textStlye,
          }}
          placeholder="비밀번호"
          value={value}
          onChange={onChange}
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry={secureTextEntry}
          // onBlur={() => Keyboard.dismiss()}
        />
      </RowView>

      <Touchable style={{marginRight: 100}} onPress={onPress}>
        <Image
          source={
            booleans
              ? require('../asssets/icons/Login/password_open.png')
              : require('../asssets/icons/Login/passwrord_hide.png')
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
