/**
* # Login.js
*
* This class is a little complicated as it handles multiple states.
*
*/
'use strict';

/**
* The ErrorAlert displays an alert for both ios & android
*/
import ErrorAlert from './ErrorAlert';
/**
* The FormButton will change it's text between the 4 states as necessary
*/
import FormButton from './FormButton';
/**
*  The UserForm does the heavy lifting of displaying the fields for
* textinput and displays the error messages
*/
import UserForm from './UserForm';
/**
* The itemCheckbox will toggle the display of the password fields
*/
import ItemCheckbox from './ItemCheckbox';

/**
* The necessary React components
*/
import React, {
  Component,
  PropTypes
} from 'react';

import ReactNative, {
  Text,
  View,
  StyleSheet
} from 'react-native';

/**
* ## Styles
*/
let styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  }
});

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.errorAlert = new ErrorAlert();
    // this.state = {
    //   username: this.props.form.fields.username,
    //   password: this.props.form.fields.password,
    //   showPassword: this.props.form.fields.showPassword
    // };
  }

  /**
  * ### componentWillReceiveProps
  * As the properties are validated they will be set here.
  */
  // componentWillReceiveProps(nextprops) {
  //   this.setState({
  //     username: nextprops.form.fields.username,
  //     password: nextprops.form.fields.password,
  //     showPassword: nextprops.form.fields.showPassword
  //   });
  // }

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
    let loginButtonText = this.props.loginButtonText;
    let onButtonPress = this.props.onButtonPress;
    let displayPasswordCheckbox = this.props.displayPasswordCheckbox;
    let status = this.props.form.status;

    let passwordCheckbox = null;
    let styles = Object.assign({}, styles, this.props.style);
    let value = {
      username: this.props.form.fields.username,
      password: this.props.form.fields.password,
      showPassword: this.props.form.fields.showPassword
    };

    // display the login / register / change password screens
    this.errorAlert.checkError(status.error);

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
            value={value}
            onChange={val=>this._onChange(val)}/>
          {passwordCheckbox}
        </View>

        <FormButton
          isDisabled={!status.isValid || status.isFetching}
          onPress={onButtonPress}
          buttonText={loginButtonText}/>
      </View>
    );
  }
}

UserComponent.propTypes = {
  loginButtonText: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  displayPasswordCheckbox: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  form: PropTypes.any,
  style: PropTypes.shape({
    container: View.propTypes.style,
    inputs: Text.propTypes.style
  })
};
