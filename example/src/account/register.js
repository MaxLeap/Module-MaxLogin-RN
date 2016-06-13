'use strict';

import React, { Component } from 'react';
import ReactNative, {View, Alert} from 'react-native';

import * as MaxLogin from 'maxlogin-react-native';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

export default class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MaxLogin.Register
          style={styles.account}
          onSuccess={user=>Actions.launch()}
          onFailure={err=>Alert.alert('Error', err.message)}
          />
      </View>
    );
  }
}
