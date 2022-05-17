import React from 'react';
import {createSlice} from '@reduxjs/toolkit';
import api from '../api';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const initalState = {
  user: null,
  phone: null,
  email: null,
  walletAddress: null,
  sessionToken: null,
  isVerified: false,
  logoutSuccess: false,
  editProfileSuccess: false,
  errorMsg: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState: initalState,
  reducers: {
    resetAuth: () => {
      return initalState;
    },
    saveSignUpSuccess(state) {
      state.logoutSuccess = false;
    },
    saveUserInfo(state, action) {
      state.user = action.payload;
    },
    loginSuccess(state) {
      state.logoutSuccess = false;
    },
    logoutSuccess(state) {
      state.logoutSuccess = true;
    },
    logoutReset(state) {
      state.logoutSuccess = false;
    },
    saveEditProfileSuccess(state) {
      state.editProfileSuccess = true;
    },
    saveEditProfileReset(state) {
      state.editProfileSuccess = false;
    },
    saveSessionToken(state, action) {
      state.sessionToken = action.payload;
    },
    saveErrorMsg(state, action) {
      state.errorMsg = action.payload;
    },
    errorMsgReset(state, action) {
      state.errorMsg = null;
    },
    saveWallet(state, action) {
      state.walletAddress = action.payload;
    },
  },
});

export const {
  saveSignUpSuccess,
  saveUserInfo,
  logoutSuccess,
  loginSuccess,
  saveEditProfileSuccess,
  saveEditProfileReset,
  saveSessionToken,
  resetAuth,
  saveErrorMsg,
  errorMsgReset,
  saveWallet,
} = userSlice.actions;

export const signIn =
  (userData, setLoginModalVisible, setPwdModalVisible) => async dispatch => {
    try {
      let {data} = await api.post(`applogin`, userData, config);

      if (data.Result === 'failed') {
        setLoginModalVisible(true);
      } else if (data.Result === 'wrong') {
        setPwdModalVisible(true);
      } else {
        dispatch(loginSuccess());
        dispatch(saveUserInfo(data));
        dispatch(saveWallet(data?.wallet));
      }
    } catch (err) {
      const {data} = err.response;
      if (data?.Result === 'failed') {
        setLoginModalVisible(true);
      }

      //  const {data} = err.response;
    }
  };
export const signOut = () => async dispatch => {
  try {
    await api.post('sign-out');

    dispatch(logoutSuccess());
    dispatch(resetAuth());
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
};

export default userSlice.reducer;
