import {CommonActions} from '@react-navigation/native';

export const getVerifyCode = Email => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return reg.test(Email);
};

export const resetNavigation = (navigation, path) => {
  const reset = CommonActions.reset({
    index: 0,
    routes: [{name: path}],
    // key: null,
  });
  navigation.dispatch(reset);
};

export const PhoneNumberConvert = number => {
  return number
    ?.toString()
    ?.replace(/\D+/g, '')
    ?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};
