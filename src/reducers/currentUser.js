'use strict';

import Actions from '../actionTypes';
const {
  LOGIN_REQUEST_SUCCESS,
  REGISTER_REQUEST_SUCCESS
} = Actions;

export default function currentUser(state, action) {
  switch (action.type) {
    case LOGIN_REQUEST_SUCCESS:
    case REGISTER_REQUEST_SUCCESS: {
      return action.payload;
    }
    default:
      return state;
  }
}
