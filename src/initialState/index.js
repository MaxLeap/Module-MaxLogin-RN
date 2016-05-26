'use strict';

import Immutable, { Record } from 'immutable';
import LoginInitState from './login';
import RegisterInitState from './register';

let login = new LoginInitState();
let register = new RegisterInitState();
let currentUser = null;

export default Record({
  login,
  register,
  currentUser
});


// {
//   MaxLogin: {
//     login: {
//
//     },
//     register: {
//
//     },
//     currentUser: {
//
//     }
//   }
// }
