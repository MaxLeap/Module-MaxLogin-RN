'use strict';

import login from './login';
import register from './register';
import currentUser from './currentUser';
import InitialState from '../initialState';

const initState = new InitialState();
export function maxlogin(state=initState, action={}) {
  return {
      login: login(state.login, action),
      register: register(state.register, action),
      currentUser: currentUser(state.currentUser, action)
  };
}
