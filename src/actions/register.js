'use strict';

import ML, { User } from 'maxleap-react-native';

import ActionTypes from '../actionTypes';
const {
  REGISTER_REQUEST_START,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE,
  REGISTER_CLEANUP,
  REGISTER_FORMFIELD_CHANGE
} = ActionTypes;

function requestStart() {
  return {
    type: REGISTER_REQUEST_START
  };
}
function requestSuccess(json) {
  return {
    type: REGISTER_REQUEST_SUCCESS,
    payload: json
  };
}
function requestFailure(error) {
  return {
    type: REGISTER_REQUEST_FAILURE,
    payload: error
  };
}

//表单字段更新
export function formFieldChange(field,value) {
  return {
    type: REGISTER_FORMFIELD_CHANGE,
    payload: {field: field, value: value}
  };
}

//模块初始化
export function cleanup() {
  return {
    type: REGISTER_CLEANUP
  };
}

/**
* ## register
* @param {string} username - name of user
* @param {string} password - user's password
*
* Call MLUser.signUp and if good, save the accessToken,
* set the state to logout and signal success
*
* Otherwise, dispatch the error so the user can see
*/
export function register({username, password, attrs, onSuccess, onFailure}) {

  return dispatch => {
    //请求开始
    dispatch(requestStart());

    User.signUp(username, password, attrs)
    .then(user=>{
      dispatch(requestSuccess(user));
      if (onSuccess) {
        onSuccess(user);
      }
    })
    .catch(err => {
      dispatch(requestFailure(err));
      if (onFailure) {
        onFailure(err);
      }
    });
  };
}
