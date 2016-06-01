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
  usernameError: null,
  password: 'User@11',
  passwordError: null,
  showPassword: false
})();

/**
 * ## Form
 * This Record contains the state of the form and the
 * fields it contains.
 */
const Form = Record({
  status: status,
  fields: fields
});

export default Form;
