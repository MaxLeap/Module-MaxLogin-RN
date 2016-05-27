'use strict';

import Immutable, { Record } from 'immutable';

let status = new Record({
  disabled: false,
  error: null,
  isValid: true,
  isFetching: false
})();

let fields = new Record({
  username: 'User11',
  usernameHasError: false,
  password: 'User@11',
  passwordHasError: false,
  showPassword: false
})();

const Form = Record({
  status,
  fields
});

export default Form;
