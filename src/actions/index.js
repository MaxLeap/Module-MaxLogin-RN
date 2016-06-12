'use strict';

import * as login from './login';
import * as register from './register';
import * as phoneLogin from './phoneLogin';

import Actions from '../actionTypes';
const {
  SET_CURRENT_USER
} = Actions;

function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    payload: user
  }
}

export default {
  login,
  register,
  phoneLogin,
  setCurrentUser
};
