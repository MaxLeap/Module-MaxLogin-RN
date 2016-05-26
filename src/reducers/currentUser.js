'use strict';

import Actions from '../actionTypes';
const {
  USER_LOGIN_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_SUCCESS
} = Actions;

export default function currentUser(state, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST_SUCCESS:
    case USER_REGISTER_REQUEST_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
