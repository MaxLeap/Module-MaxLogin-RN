'use strict';

import Immutable, { Record } from 'immutable';

let status = new Record({
  disabled: false,
  error: null,
  isValid: true,
  isFetching: false
})();

let fields = new Record({
  username: '',
  usernameError: null,
  password: '',
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
  fields: fields,
  testIsValid: form=>{
    let usernameValid = form.fields.username !== '' && !form.fields.usernameError
    let pwdValid = form.fields.password !== '' && !form.fields.passwordError
    return (usernameValid && pwdValid)
  }
});

export default Form;
