'use strict';

import LoginActionTypes from './login';
import RegisterActionTypes from './register';
import PhoneLoginActionTypes from './phoneLogin';

const SET_CURRENT_USER = 'MAXLOGIN_SET_CURRENT_USER'

export default Object.assign(
  {SET_CURRENT_USER},
  LoginActionTypes,
  RegisterActionTypes,
  PhoneLoginActionTypes
);
