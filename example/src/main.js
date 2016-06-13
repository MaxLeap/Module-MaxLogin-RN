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


export default function main(platform) {

  const rootReducers = combineReducers(MaxLogin.reducers);
  const initState = {
    maxlogin: new MaxLogin.InitialState()
  };
  const store = createStore(rootReducers, initState, applyMiddleware(thunk));

  class example extends Component {
    render() {
      return (
        <Provider store={store}>
          <Launcher />
        </Provider>
      );
    }
  }

  function isAnonymous(user) {
    let authData = user.get('authData')
    let anonymous = authData && authData['anonymous']
    let aid = anonymous && anonymous['id']
    return aid !== undefined
  }

  // 获取本地缓存的用户
  MaxLeap.User.currentAsync().then(user => {
    if (user && !isAnonymous(user)) {
      // 自动登录
      store.dispatch(MaxLogin.setCurrentUser(user))
    }
  }).catch(err => {
    console.log(err);
  })

  AppRegistry.registerComponent('example', () => example);
}
