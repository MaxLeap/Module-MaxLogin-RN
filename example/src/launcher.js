'use strict';


import React, { Component } from 'react';
import { Actions, Scene, Router, Modal } from 'react-native-router-flux';

import RootView from './rootView';
import Login from './account/login';
import Register from './account/register';
import PhoneLogin from './account/phoneLogin';

export default class example extends Component {
  render() {
    return (
      <Router>
        <Scene key='modal' component={Modal}>
          <Scene key='root' hideNavBar>
            <Scene key='launch' component={RootView} initial/>
            <Scene key='account' direction="vertical">
              <Scene key='login'
                component={Login}
                title='Login'
                leftTitle='Close'
                onLeft={(e)=>Actions.pop()}
                rightTitle='Register'
                onRight={e=>Actions.register()}
                />
              <Scene key='register' component={Register} title="Register"/>
            </Scene>
            <Scene key='other' direction='vertical'>
              <Scene key='phoneLogin'
                component={PhoneLogin}
                title='Phone Login'
                leftTitle='Close'
                onLeft={(e)=>Actions.pop()}
                />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
