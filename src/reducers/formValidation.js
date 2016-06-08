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

  let valid = form.testIsValid(form)?true:false
  return form.setIn(['status','isValid'], valid);
}
