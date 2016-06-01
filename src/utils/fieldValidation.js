/**
* # Login.js
*
* This class is a little complicated as it handles 4 states. It's also
* a container so there is boilerplate from Redux similiar to ```App```.
*/
'use strict';

/**
* ## Imports
*
* validate and lodash
*
*/
import validate from 'validate.js';

/**
* ## Email validation setup
* Used for validation of emails
*/
const emailConstraints = {
  from: {
    email: true
  }
};

/**
* ## username validation rule
* read the message.. )
*/
const usernamePattern = /^[a-zA-Z0-9]{6,12}$/;
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i',
      message: "Must have 6-12 numbers, letters or special characters"
    }
  }
};

/**
* ## password validation rule
* read the message... )
*/
const passwordPattern =  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/;
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: "i",
      message: "Must have at least a number and a special character," + " and between 6-12 in length"
    }
  }
};

const phoneNumberPattern =  /^1[0-9]{10}$/;
const phoneNumberConstraints = {
  phoneNumber: {
    format: {
      pattern: phoneNumberPattern,
      flags: "i"
    }
  }
};

/**
* ## Field Validation
* @param {Object} state Redux state
* @param {Object} action type & payload
*/
export default function fieldValidation(state, {payload:{field, value}}) {

  switch(field) {
    /**
    * ### username validation
    * set the form field error
    */
    case('username'): {
      let validUsername  = validate({username: value}, usernameConstraints) === undefined;
      if (validUsername) {
        return state.setIn(['usernameError'], null);
      } else {
        return state.setIn(['usernameError'], usernameConstraints.username.format.message);
      }
    }
    break;

    /**
    * ### email validation
    * set the form field error
    */
    case('email'): {
      let validEmail  = validate({from: value}, emailConstraints) === undefined;
      if (validEmail) {
        return state.setIn(['emailError'], null);
      } else {
        return state.setIn(['emailError'], 'Invalid email address.');
      }
    }
    break;

    /**
    * ### password validation
    * set the form field error
    */
    case('password'): {
      let validPassword = validate({password: value}, passwordConstraints) === undefined;
      if (validPassword) {
        return state.setIn(['passwordError'], null);
      } else {
        return state.setIn(['passwordError'], passwordConstraints.password.format.message);
      }
    }
    break;

    /**
    * ### showPassword
    * toggle the display of the password
    */
    case('showPassword'): {
      return state.setIn(['showPassword'], value);
    }

    case('phoneNumber'): {
      let isValid = value && value.length>0 && validate({'phoneNumber': value}, phoneNumberConstraints) === undefined;
      return state.setIn(['phoneNumberIsValid'], isValid);
    }

    case('smscode'): {
      let isValid = value && value.length === 6;
      return state.setIn(['smscodeIsValid'], isValid);
    }

    default: {
      return state;
    }
  }
}
