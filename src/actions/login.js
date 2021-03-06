'use strict';

import ML, { User } from 'maxleap-react-native';

import ActionTypes from '../actionTypes';
const {
  LOGIN_REQUEST_START,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  LOGIN_CLEANUP,
  LOGIN_FORMFIELD_CHANGE
} = ActionTypes;

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
function requestStart() {
  return {
    type: LOGIN_REQUEST_START
  };
}

function requestSuccess(json) {
  return {
    type: LOGIN_REQUEST_SUCCESS,
    payload: json
  };
}

function requestFailure(error) {
  return {
    type: LOGIN_REQUEST_FAILURE,
    payload: error
  };
}

//表单字段更新
export function formFieldChange(field, value) {
  return {
    type: LOGIN_FORMFIELD_CHANGE,
    payload: {field, value}
  };
}

//模块初始化
export function cleanup() {
  return {
    type: LOGIN_CLEANUP
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
export function login({username, password, onSuccess, onFailure}) {

  return dispatch => {
    //请求开始
    dispatch(requestStart());

    return User.logIn(username, password)
    .then(user => {
        // 登录成功
        dispatch(requestSuccess(user));
        if (onSuccess) {
          onSuccess(user);
        }
    })
    .catch((error) => {
      // 登录失败
      dispatch(requestFailure(error));
      if (onFailure) {
        onFailure(error);
      }
    });
  };
}
