'use strict';

import login from './login';
import register from './register';
import phoneLogin from './phoneLogin';
import currentUser from './currentUser';
import InitialState from '../initialState';

const initState = new InitialState();
export function maxlogin(state=initState, action={}) {
  return state.setIn(['login'], login(state.login, action))
              .setIn(['register'], register(state.register, action))
              .setIn(['phoneLogin'], phoneLogin(state.phoneLogin, action))
              .setIn(['currentUser'], currentUser(state.currentUser, action));
}
