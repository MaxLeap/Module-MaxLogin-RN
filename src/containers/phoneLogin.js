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
  Text,
  Alert
} from 'react-native';

/**
* Immutable
*/
import Immutable, { Map } from 'immutable';

import actions from '../actions';
import UserComponent from '../components/UserComponent';

const DEFAULT_WAIT_TIME = 60;

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
export default class PhoneLogin extends Component {
  componentWillUnmount() {
    this._stopCounter();
    this.props.actions.cleanup();
  }

  _onButtonPress(e) {
    if (this._alertPhoneNumber() && this._alertSmscode()) {
      let phoneNumber = this.props.form.fields.phoneNumber;
      let smscode = this.props.form.fields.smscode;
      let handler = this.props.onSubmit || this.props.actions.login
      handler({
        phoneNumber,
        smscode,
        onSuccess: this.props.onSuccess,
        onFailure: this.props.onFailure
      });
    }
  }

  _onChange(value) {
    let form = this.props.form;
    let formFieldChange = this.props.actions.formFieldChange;

    if (value.phoneNumber !== form.fields.phoneNumber) {
      formFieldChange('phoneNumber', value.phoneNumber);
    }
    if (value.smscode !== form.fields.smscode) {
      formFieldChange('smscode', value.smscode);
    }
  }

  _alertPhoneNumber() {
    if (! this.props.form.fields.phoneNumberIsValid) {
      Alert.alert(null, 'Please input valid phone number!');
      return false;
    }
    return true;
  }

  _alertSmscode() {
    if (! this.props.form.fields.smscodeIsValid) {
      Alert.alert(null, 'Please input valid sms code!');
      return false;
    }
    return true;
  }

  _stopCounter() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.props.actions.counterStop();
    }
  }

  _onFieldAccessoryPress(path) {
    if (this._alertPhoneNumber() && path && path[0] === 'smscode') {
      // gain passcode
      this.props.actions.reqeustSmsCode({
        phoneNumber: this.props.form.fields.phoneNumber,
        onSuccess: this.props.onSmsRequestSuccess,
        onFailure: this.props.onSmsRequestFailure
      });
      let waitSeconds = this.props.waitSeconds || DEFAULT_WAIT_TIME;
      this.props.actions.counterStart(waitSeconds);
      this.timer = setInterval(()=>{
        this.props.actions.countdown(1);
        if (this.props.form.fields.countValue <= 0) {
          this._stopCounter();
        }
      }, 1000);
    }
  }

  render() {
    return (
      <UserComponent
        buttonText={'验证并登录'}
        {...this.props}
        onButtonPress={e=>this._onButtonPress(e)}
        onChange={e=>this._onChange(e)}
        onFieldAccessoryPress={path=>this._onFieldAccessoryPress(path)}
        />
    );
  }
}

PhoneLogin.propTypes = {
  onSmsRequestSuccess: PropTypes.func,
  onSmsRequestFailure: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
  onSubmit: PropTypes.func,
  waitSeconds: PropTypes.number // default is 60s
};

function mapStateToProps(state) {
  return {
    form: state.maxlogin.phoneLogin
  };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
  .merge(actions.phoneLogin)
  .filter(value => typeof value === 'function')
  .toObject();

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneLogin);
