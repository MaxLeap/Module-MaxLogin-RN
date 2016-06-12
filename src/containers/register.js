'use strict';

/**
* ## Imports
*
* Redux
*/
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, {
  Component,
  PropTypes
} from 'react';

import ReactNative, { Text, View } from 'react-native';

/**
* Immutable
*/
import Immutable, { Map } from 'immutable';

import actions from '../actions';
import UserComponent from '../components/UserComponent';

/*
loginButtonText: PropTypes.string.required,
onButtonPress: PropTypes.func.required,
displayPasswordCheckbox: PropTypes.bool,
onChange: PropTypes.func.required,
form: PropTypes.instanceOf(Form),
style: PropTypes.shape({
  container: View.propTypes.style,
  inputs: Text.propTypes.style
})
*/
export default class Register extends Component {
  componentWillUnmount() {
    this.props.actions.cleanup();
  }

  _onButtonPress(e) {
    let username = this.props.form.fields.username;
    let password = this.props.form.fields.password;
    let handler = this.props.onSubmit || this.props.actions.register
    handler({
      username,
      password,
      onSuccess:this.props.onSuccess,
      onFailure:this.props.onFailure
    });
  }

  _onChange(value) {
    let form = this.props.form;
    let formFieldChange = this.props.actions.formFieldChange;

    if (value.username !== form.fields.username) {
      formFieldChange('username', value.username);
    }
    if (value.password !== form.fields.password) {
      formFieldChange('password', value.password);
    }
    if (value.showPassword !== form.fields.showPassword) {
      formFieldChange('showPassword', value.showPassword);
    }
  }

  render() {
    return (
      <UserComponent
        buttonText={'注册'}
        {...this.props}
        onButtonPress={e=>{this._onButtonPress(e);}}
        onChange={e=>this._onChange(e)}
        />
    );
  }
}

Register.propTypes = {
  displayPasswordCheckbox: PropTypes.bool,
  onSuccess: PropTypes.func,
  onSubmit: PropTypes.func,
  onFailure: PropTypes.func
};

function mapStateToProps(state) {
    return {
      form: state.maxlogin.register
    };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(actions.register)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
