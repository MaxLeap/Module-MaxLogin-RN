/**
*
* This class utilizes the ```tcomb-form-native``` library and just
* sets up the options required for the 3 states of Login, namely
* Login, Register or Reset Password
*
*/
'use strict';


import React, { PropTypes, Component } from 'react';
import ReactNative from 'react-native';

/**
*  The fantastic little form library
*/
import tcomb from 'tcomb-form-native';
let Form = tcomb.form.Form;

export default class UserForm extends Component {

  /**
  * ## render
  *
  * setup all the fields using the props and default messages
  *
  */
  render() {
    let options = {
      auto: 'placeholders',
      fields: {}
    };

    let username = {
      label: 'Username',
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: 'Please enter valid username'
    };

    let secureTextEntry = !this.props.form.fields.showPassword;

    let password = {
      label: 'Password',
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: 'Must have 6-12 characters with at least 1 number and 1 special character'
    };

    let userForm = tcomb.struct({
      username: tcomb.String,
      password: tcomb.String
    });
    options.fields.username = username;
    options.fields.password = password;

    /**
    * ### Return
    * returns the Form component with the correct structures
    */
    return (
      <Form ref="form"
        type={userForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
        />
    );
  }
}

/**
* ## LoginForm class
*
* * form: the properties to set into the UI form
* * value: the values to set in the input fields
* * onChange: function to call when user enters text
*/
UserForm.propTypes = {
  form: PropTypes.object,
  value: PropTypes.object,
  onChange: PropTypes.func
};
