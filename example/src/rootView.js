'use strict';

import React, {PropTypes} from 'react';
import ReactNative, {
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Root extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableHighlight style={{height: 50, justifyContent: 'center', backgroundColor: '#DDEDDD'}}
                            onPress={e=>Actions.account()}
                            underlayColor={'#32BE78'}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            Login
          </Text>
        </TouchableHighlight>
        <TouchableHighlight style={{height: 50, justifyContent: 'center', backgroundColor: '#D0ADBD'}}
                            onPress={e=>Actions.other()}
                            underlayColor={'#32BE78'}>
          <Text style={{textAlign: 'center', fontSize: 20}}>
            Phone Login
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}
