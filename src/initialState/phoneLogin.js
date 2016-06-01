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
  fields
});

export default Form;
