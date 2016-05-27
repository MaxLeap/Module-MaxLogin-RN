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

import ReactNative, {
  View,
  Text
} from 'react-native';

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
export default class Login extends Component {
  componentWillUnmount() {
    this.props.actions.cleanup();
  }

  _onButtonPress(e) {
    let username = this.props.form.fields.username;
    let password = this.props.form.fields.password;
    this.props.actions.login({
      username,
      password,
      onSuccess: this.props.onSuccess,
      onFailure: this.props.onFailure
    });
  }

  _onChange(value) {
    let form = this.props.form;
    let formFieldChange = this.props.actions.formFieldChange;

    if (value.username !== form.username) {
      formFieldChange('username', value.username);
    }
    if (value.password !== form.password) {
      formFieldChange('password', value.password);
    }
    if (value.showPassword !== form.showPassword) {
      formFieldChange('showPassword', value.showPassword);
    }
  }

  render() {
    return (
      <UserComponent
        loginButtonText={'Login'}
        {...this.props}
        onButtonPress={e=>this._onButtonPress(e)}
        onChange={e=>this._onChange(e)}
        />
    );
  }
}

Login.propTypes = {
  displayPasswordCheckbox: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  style: PropTypes.shape({
    container: View.propTypes.style,
    inputs: Text.propTypes.style
  })
};

function mapStateToProps(state) {
  return {
    form: state.maxlogin.login
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(actions.login)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
