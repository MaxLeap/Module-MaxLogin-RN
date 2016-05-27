'use strict';

import React, { Component } from 'react';
import ReactNative, {View} from 'react-native';

import * as MaxLogin from 'maxlogin-react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MaxLogin.Login
          style={styles.account}
          onSuccess={user=>{console.log(user); Actions.pop();}}
          onFailure={err=>console.log(err)}
          />
      </View>
    );
  }
}
