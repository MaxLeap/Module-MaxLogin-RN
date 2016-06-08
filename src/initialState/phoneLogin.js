'use strict';

import Immutable, { Record } from 'immutable';

let status = new Record({
  active: false,
  error: null,
  isValid: false,
  isFetching: false
})();

let fields = new Record({
  phoneNumber: '',
  phoneNumberIsValid: false,
  smscode: '',
  smscodeIsValid: false,
  countValue: 0,
  isCounting: false
})();

const Form = Record({
  status,
  fields,
  testIsValid: form => {
    let phoneValid = form.fields.phoneNumber !== '' && form.fields.phoneNumberIsValid
    let smscodeValid = form.fields.smscode !== '' && form.fields.smscodeIsValid
    return (phoneValid && smscodeValid)
  }
});

export default Form;
