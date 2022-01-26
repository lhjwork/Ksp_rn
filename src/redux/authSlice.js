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
  sessionToken: null,
  isVerified: false,

  logoutSuccess: true,
  editProfileSuccess: false,
  errorMsg: null,
};

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    sessionToken: null,
    isVerified: false,

    logoutSuccess: false,
    editProfileSuccess: false,
    errorMsg: null,
  },
  reducers: {
    resetAuth: state => initialState,
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
} = userSlice.actions;

export default userSlice.reducer;
