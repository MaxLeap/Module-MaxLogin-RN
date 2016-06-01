/**
* # Login.js
*
* This class is a little complicated as it handles multiple states.
*
*/
'use strict';

/**
* The platform neutral button
*/
import Button from 'apsl-react-native-button';

/**
*  The UserForm does the heavy lifting of displaying the fields for
* textinput and displays the error messages
*/
import UserForm from './UserForm';
/**
* The itemCheckbox will toggle the display of the password fields
*/
import ItemCheckbox from './ItemCheckbox';

import stylesheet from '../stylesheet';

/**
* The necessary React components
*/
import React, {
  Component,
  PropTypes
} from 'react';

import ReactNative, {
  Text,
  View
} from 'react-native';

export default class UserComponent extends Component {
  /**
  * ### onChange
  *
  * As the user enters keys, this is called for each key stroke.
  * Rather then publish the rules for each of the fields, I find it
  * better to display the rules required as long as the field doesn't
  * meet the requirements.
  * *Note* that the fields are validated by the authReducer
  */
  _onChange(value) {
    // this.setState(value);
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  /**
  * ### render
  * Setup some default presentations and render
  */
  render() {
    let buttonText = this.props.buttonText;
    let onButtonPress = this.props.onButtonPress;
    let displayPasswordCheckbox = this.props.displayPasswordCheckbox;
    let status = this.props.form.status;

    let styles = Object.assign({}, stylesheet, this.props.style);
    let passwordCheckbox = null;

    // display the login / register / change password screens
    // this.errorAlert.checkError(status.error, ()=>{this.props.actions.cleanup();});

    /**
    * Toggle the display of the Password and PasswordAgain fields
    */
    if (displayPasswordCheckbox) {
      passwordCheckbox = (
        <ItemCheckbox
          text="Show Password"
          checked={this.props.form.fields.showPassword}
          disabled={status.isFetching}
          onCheck={() => this._onChange({showPassword: true})}
          onUncheck={() => this._onChange({showPassword: false})}
          />
      );
    }

    /**
    * The Form is now defined with the required fields.  Just
    * surround it with the Header and the navigation messages
    * Note how the button too is disabled if we're fetching. The
    * header props are mostly for support of Hot reloading.
    * See the docs for Header for more info.
    */
    return (
      <View style={styles.container}>

        <View style={styles.inputs}>
          <UserForm form={this.props.form}
            value={this.props.form.fields.toJS()}
            onChange={val=>this._onChange(val)}
            onFieldAccessoryPress={this.props.onFieldAccessoryPress}
            formStyle={styles.formStyle}
            />
          {passwordCheckbox}
        </View>

        <Button style={styles.button.normal}
                disabledStyle={styles.button.disabled}
                textStyle={styles.button.textStyle}
                isDisabled={!status.isValid || status.isFetching}
                onPress={onButtonPress}>
          {buttonText}
        </Button>
      </View>
    );
  }
}

UserComponent.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  displayPasswordCheckbox: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.any,
  style: PropTypes.shape({
    container: View.propTypes.style,
    inputs: Text.propTypes.style,
    button: PropTypes.shape({
      normal: View.propTypes.style,
      disabled: Text.propTypes.style,
      textStyle: Text.propTypes.style
    }),
    formStyle: PropTypes.any
  })
};
