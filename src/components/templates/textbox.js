'use strict';

import React from 'react';
import ReactNative, {
  View,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';
import Button from 'apsl-react-native-button';

export default function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  let stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let textGroupStyle = stylesheet.textGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let textboxStyle = stylesheet.textbox.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  let buttonTextStyle = stylesheet.helpBlock.textStyle.normal;
  let errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    textGroupStyle = stylesheet.textGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    textboxStyle = stylesheet.textbox.error;
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable;
  }

  let separaterStyle = {
    height: textGroupStyle.borderBottomWidth,
    backgroundColor: textGroupStyle.borderBottomColor
  };

  let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null;
  let button = null;
  if (locals.help) {
    if (!locals.help.active) {
      helpBlockStyle = stylesheet.helpBlock.error;
      buttonTextStyle = stylesheet.helpBlock.textStyle.error;
    }
    button = (
      <Button style={helpBlockStyle}
              textStyle={buttonTextStyle}
              isDisabled={locals.help.disabled}
              onPress={e=>locals.help.onPress && locals.help.onPress(locals.path)}>
        {locals.help.text}
      </Button>
      // {/*<TouchableHighlight style={helpBlockStyle}
      //                     disabled={locals.help.disabled}
      //                     activeOpacity={0.5}
      //                     underlayColor={helpBlockStyle.backgroundColor}
      //                     onPress={e=>locals.help.onPress && locals.help.onPress(locals.path)}>
      //   <Text style={buttonTextStyle}>{locals.help.text}</Text>
      // </TouchableHighlight>*/}
    );
  }
  // let help = locals.help ? <Text style={helpBlockStyle}>{locals.help}</Text> : null;
  let error = locals.hasError && locals.error ? <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>{locals.error}</Text> : null;

  let props = {
    autoCapitalize: locals.autoCapitalize,
    autoCorrect: locals.autoCorrect,
    autoFocus: locals.autoFocus,
    blurOnSubmit: locals.blurOnSubmit,
    editable: locals.editable,
    keyboardType: locals.keyboardType,
    maxLength: locals.maxLength,
    multiline: locals.multiline,
    onBlur: locals.onBlur,
    onEndEditing: locals.onEndEditing,
    onFocus: locals.onFocus,
    onLayout: locals.onLayout,
    onSelectionChange: locals.onSelectionChange,
    onSubmitEditing: locals.onSubmitEditing,
    placeholderTextColor: locals.placeholderTextColor,
    secureTextEntry: locals.secureTextEntry,
    selectTextOnFocus: locals.selectTextOnFocus,
    selectionColor: locals.selectionColor,
    numberOfLines: locals.numberOfLines,
    underlineColorAndroid: locals.underlineColorAndroid,
    clearButtonMode: locals.clearButtonMode,
    clearTextOnFocus: locals.clearTextOnFocus,
    enablesReturnKeyAutomatically: locals.enablesReturnKeyAutomatically,
    keyboardAppearance: locals.keyboardAppearance,
    onKeyPress: locals.onKeyPress,
    returnKeyType: locals.returnKeyType,
    selectionState: locals.selectionState,
    placeholder: locals.placeholder,
    value: locals.value
  };

  return (
    <View style={formGroupStyle}>
      <View style={textGroupStyle}>
        {label}
        <TextInput
          ref={'input'}
          accessibilityLabel={locals.label}
          onChangeText={(value) => locals.onChange(value)}
          style={textboxStyle}
          {...props}
          />
        {button}
      </View>
      <View style={separaterStyle}/>
      {error}
    </View>
  );
}
