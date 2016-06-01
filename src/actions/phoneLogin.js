'use strict';

import ML, { User } from 'maxleap-react-native';

import Actions from '../actionTypes';
const {
  SMSCODE_REQUEST_START,
  SMSCODE_REQUEST_SUCCESS,
  SMSCODE_REQUEST_FAILURE,

  SMSCODE_COUNTDOWN_START,
  SMSCODE_COUNTDOWN,
  SMSCODE_COUNTDOWN_END,

  PHONE_LOGIN_REQUEST_START,
  PHONE_LOGIN_REQUEST_SUCCESS,
  PHONE_LOGIN_REQUEST_FAILURE,

  PHONE_LOGIN_CLEANUP,
  PHONE_LOGIN_FORMFIELD_CHANGE
} = Actions;

function smsRequestStart() {
  return {
    type: SMSCODE_REQUEST_START
  };
}

function smsRequestSuccess(json) {
  return {
    type: SMSCODE_REQUEST_SUCCESS,
    payload: json
  };
}

function smsRequestFailure(error) {
  return {
    type: SMSCODE_REQUEST_FAILURE,
    payload: error
  };
}

/**
* ## Request Login SMS Code
* @param {string} username - user's username
* @param {string} password - user's password
*
* After calling Backend, if response is good, save the json
* which is the currentUser which contains the accessToken
*
* If successful, set the state to logout
* otherwise, dispatch a failure
*/
export function reqeustSmsCode({phoneNumber, onSuccess, onFailure}) {

  return dispatch => {
    //请求开始
    dispatch(smsRequestStart());

    return User.requestLoginSmsCode(phoneNumber)
    .then(() => {
      // 登录成功
      dispatch(smsRequestSuccess());
      if (onSuccess) {
        onSuccess();
      }
    })
    .catch((error) => {
      // 登录失败
      dispatch(smsRequestFailure(error));
      if (onFailure) {
        onFailure(error);
      }
    });
  };
}

export function counterStart(value) {
  return {
    type: SMSCODE_COUNTDOWN_START,
    value
  };
}

export function countdown(decrement) {
  return {
    type: SMSCODE_COUNTDOWN,
    decrement
  };
}

export function counterStop() {
  return {
    type: SMSCODE_COUNTDOWN_END
  };
}

/**
* ## Login
* After dispatching the logoutRequest, get the accessToken
* and call Parse
*
* When the response from Parse is received and it's valid
* change the state to register and finish the logout
*
* But if the call to Parse fails, like expired token or
* no network connection, just send the failure
*
* And if you fail due to an invalid accessToken, be sure
* to delete it so the user can log in.
*
* How could there be an invalid accessToken?  Maybe they
* haven't used the app for a long time.  Or they used another
* device and logged out there.
*/
/**
* ## Login actions
*/
function loginStart() {
  return {
    type: PHONE_LOGIN_REQUEST_START
  };
}

function loginSuccess(json) {
  return {
    type: PHONE_LOGIN_REQUEST_SUCCESS,
    payload: json
  };
}

function loginFailure(error) {
  return {
    type: PHONE_LOGIN_REQUEST_FAILURE,
    payload: error
  };
}

//表单字段更新
export function formFieldChange(field, value) {
  return {
    type: PHONE_LOGIN_FORMFIELD_CHANGE,
    payload: {field, value}
  };
}

//模块初始化
export function cleanup() {
  return {
    type: PHONE_LOGIN_CLEANUP
  };
}

/**
* ## Login
* @param {string} username - user's username
* @param {string} password - user's password
*
* After calling Backend, if response is good, save the json
* which is the currentUser which contains the accessToken
*
* If successful, set the state to logout
* otherwise, dispatch a failure
*/
export function login({phoneNumber, smscode, onSuccess, onFailure}) {

  return dispatch => {
    //请求开始
    dispatch(loginStart());

    return User.logInWithMobilePhoneSmsCode(phoneNumber, smscode)
    .then(user => {
      // 登录成功
      dispatch(loginSuccess(user));
      if (onSuccess) {
        onSuccess(user);
      }
    })
    .catch((error) => {
      // 登录失败
      dispatch(loginFailure(error));
      if (onFailure) {
        onFailure(error);
      }
    });
  };
}
