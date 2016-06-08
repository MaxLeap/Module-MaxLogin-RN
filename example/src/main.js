/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 'use strict';

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as MaxLogin from 'maxlogin-react-native';
import Launcher from './launcher';
import MaxLeap from 'maxleap-react-native';

MaxLeap.useCNServer();

export default function main(platform) {

  const rootReducers = combineReducers(MaxLogin.reducers);
  const initState = {
    maxlogin: new MaxLogin.InitialState()
  };
  const store = createStore(rootReducers, initState, applyMiddleware(thunk));

  class example extends Component {
    render() {
      MaxLeap.User.currentAsync().then(value => {
        console.log(value);
      })
      return (
        <Provider store={store}>
          <Launcher />
        </Provider>
      );
    }
  }

  AppRegistry.registerComponent('example', () => example);
}
