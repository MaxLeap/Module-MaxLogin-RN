/**
* # FormButton.js
*
* Display a button that responds to onPress and is colored appropriately
*/
'use strict';
/**
* ## Imports
*
* React
*/
import React, { Component } from 'react';
import ReactNative, { StyleSheet, View } from 'react-native';

/**
* The platform neutral button
*/
import Button from 'apsl-react-native-button';

/**
* ## Styles
*/
let styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#3385ff',
    borderColor:  '#3385ff'
  }
});

export default class FormButton extends Component {
  /**
  * ### render
  *
  * Display the Button
  */
  render() {
    return (
      <View style={styles.signin}>
        <Button style={styles.button}
          textStyle={{color: 'white'}}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress}
          >
          {this.props.buttonText}
        </Button>
      </View>
    );
  }
}
