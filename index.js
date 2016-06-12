'use strict';

import Login from './src/containers/login';
import Register from './src/containers/register';
import PhoneLogin from './src/containers/phoneLogin';
import * as reducers from './src/reducers';
import InitialState from './src/initialState';
import stylesheet from './src/stylesheet';
import actions from './src/actions';
let setCurrentUser = actions.setCurrentUser;

export {
  setCurrentUser,
  Login,
  Register,
  PhoneLogin,
  reducers,
  InitialState,
  stylesheet
};
