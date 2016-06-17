'use strict';

import Actions from '../actionTypes';
const {
  SET_CURRENT_USER,
  LOGIN_REQUEST_SUCCESS,
  REGISTER_REQUEST_SUCCESS,
  PHONE_LOGIN_REQUEST_SUCCESS
} = Actions;

export default function currentUser(state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    case LOGIN_REQUEST_SUCCESS:
    case REGISTER_REQUEST_SUCCESS:
    case PHONE_LOGIN_REQUEST_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
