'use strict';

import Immutable, { Record } from 'immutable';
import LoginInitState from './login';
import RegisterInitState from './register';
import PhoneLoginInitState from './phoneLogin';

let login = new LoginInitState();
let register = new RegisterInitState();
let phoneLogin = new PhoneLoginInitState();
let currentUser = null;

export default Record({
  login,
  register,
  phoneLogin,
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
//     phoneLogin: {
//     
//     },
//     currentUser: {
//
//     }
//   }
// }
