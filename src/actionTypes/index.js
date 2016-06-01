'use strict';

import LoginActionTypes from './login';
import RegisterActionTypes from './register';
import PhoneLoginActionTypes from './phoneLogin';

export default Object.assign(
  {},
  LoginActionTypes,
  RegisterActionTypes,
  PhoneLoginActionTypes
);
