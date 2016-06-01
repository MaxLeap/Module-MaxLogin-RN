/**
 * # formValidation.js
 *
 * This class determines only if the form is valid
 * so that the form button can be enabled.
 * if all the fields on the form are without error,
 * the form is considered valid
 */
'use strict';

/**
 * ## Imports
 * the actions being addressed
 */


/**
 * ## formValidation
 * @param {Object} state - the Redux state object
 */
export default function formValidation (form) {
  if (form.fields.username !== '' &&
  form.fields.email !== '' &&
  form.fields.password !== '' &&
  form.fields.phoneNumber !== '' &&
  form.fields.smscode !== '' &&
  !form.fields.usernameError &&
  !form.fields.emailError &&
  !form.fields.passwordError &&
  form.fields.phoneNumberIsValid &&
  form.fields.smscodeIsValid) {
    return form.setIn(['status','isValid'],true);
  } else {
    return form.setIn(['status','isValid'],false);
  }
}
