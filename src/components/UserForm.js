/**
*
* This class utilizes the ```tcomb-form-native``` library and just
* sets up the options required for the 3 states of Login, namely
* Login, Register or Reset Password
*
*/
'use strict';


import React, { PropTypes, Component } from 'react';
import ReactNative, { TextInput } from 'react-native';

/**
*  The fantastic little form library
*/
import tcomb from 'tcomb-form-native';
let Form = tcomb.form.Form;

import textbox from './templates/textbox';
import formStyle from './stylesheet/formStyle';

export default class UserForm extends Component {

  formType() {
    let fields = this.props.form.fields;
    let struct = {};
    if (fields.username !== undefined) {
      struct.username = tcomb.String;
    }
    if (fields.password !== undefined) {
      struct.password = tcomb.String;
    }
    if (fields.phoneNumber !== undefined) {
      struct.phoneNumber = tcomb.String;
    }
    if (fields.smscode !== undefined) {
      struct.smscode = tcomb.String;
    }
    return tcomb.struct(struct);
  }

  /**
  * ## render
  *
  * setup all the fields using the props and default messages
  *
  */
  render() {
    let status = this.props.form.status;
    let fields = this.props.form.fields;
    let editable = !status.isFetching;

    let options = {
      auto: 'placeholders',
      stylesheet: formStyle,
      fields: {
        username: {
          label: '用户名',
          placeholder: '请输入用户名',
          autoCorrect: false,
          editable,
          hasError: fields.usernameError,
          error: fields.usernameError,
          template: textbox,
          clearButtonMode: 'while-editing'
        },
        password: {
          label: '密码',
          placeholder: '请输入密码',
          secureTextEntry: !fields.showPassword,
          editable,
          hasError: fields.passwordError,
          error: fields.passwordError,
          template: textbox,
          clearButtonMode: 'while-editing'
          // error: 'Must have 6-12 characters with at least 1 number and 1 special character'
        },
        phoneNumber: {
          label: '手机号',
          placeholder: '请输入手机号',
          keyboardType: 'numeric',
          editable,
          hasError: !fields.phoneNumberIsValid,
          template: textbox,
          clearButtonMode: 'while-editing'
        },
        smscode: {
          label: '验证码',
          placeholder: '请输入验证码',
          editable,
          hasError: !fields.smscodeIsValid,
          help: {
            text: fields.isCounting ? fields.countValue + 's' : '获取验证码',
            active: fields.phoneNumberIsValid && !fields.isCounting,
            disabled: fields.isCounting,
            onPress: this.props.onFieldAccessoryPress
          },
          template: textbox,
          clearButtonMode: 'while-editing'
        }
      }
    };

    /**
    * ### Return
    * returns the Form component with the correct structures
    */
    return (
      <Form
        {...this.props}
        ref="form"
        type={this.formType()}
        options={options}
        />
    );
  }
}
