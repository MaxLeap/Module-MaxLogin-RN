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

const Form = Record({
  status,
  fields,
  testIsValid: form=>{
    let usernameValid = form.fields.username !== '' && !form.fields.usernameError
    let pwdValid = form.fields.password !== '' && !form.fields.passwordError
    return (usernameValid && pwdValid)
  }
});

export default Form;
