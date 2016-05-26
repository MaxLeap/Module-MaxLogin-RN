'use strict';

import Immutable, { Record } from 'immutable';

let status = new Record({
  disabled: false,
  error: null,
  isValid: true,
  isFetching: false
})();

let fields = new Record({
  username: 'user11',
  usernameHasError: false,
  password: 'user@11',
  passwordHasError: false,
  showPassword: false
})();

const Form = Record({
  status,
  fields
});

export default Form;
