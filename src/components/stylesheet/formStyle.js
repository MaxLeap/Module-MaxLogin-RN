/*

  a bootstrap like style

*/
'use strict';

let LABEL_COLOR = '#000000';
let INPUT_COLOR = '#000000';
let ERROR_COLOR = '#a94442';
let HELP_COLOR = '#999999';
let BORDER_COLOR = '#cccccc';
let DISABLED_COLOR = '#777777';
let DISABLED_BACKGROUND_COLOR = '#eeeeee';
let FONT_SIZE = 17;
let FONT_WEIGHT = '500';
let ERROR_FONT_SIZE = 12;
let DEFAULT_GRAY_COLOR = '#8f8f8f';

export default {
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      marginBottom: 10
    },
    error: {
      marginBottom: 10
    }
  },
  textGroup: {
    normal: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: BORDER_COLOR
    },
    error: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 0.5,
      borderBottomColor: BORDER_COLOR
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginRight: 7,
      width: 51
    },
    // the style applied when a validation error occours
    error: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginRight: 7,
      width: 51
    }
  },
  textbox: {
    normal: {
      flex: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7
    },
    // the style applied when a validation error occours
    error: {
      flex: 1,
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7
    },
    // the style applied when the textbox is not editable
    notEditable: {
      flex: 1,
      fontSize: FONT_SIZE,
      height: 36,
      padding: 7,
      color: INPUT_COLOR
    }
  },
  helpBlock: {
    normal: {
      justifyContent: 'center',
      backgroundColor: '#ff7700',
      borderRadius: 3,
      marginLeft: 7,
      height: 33,
      paddingLeft: 15,
      paddingRight: 15
    },
    // the style applied when a validation error occours
    error: {
      justifyContent: 'center',
      backgroundColor: DEFAULT_GRAY_COLOR,
      borderRadius: 3,
      marginLeft: 7,
      height: 33,
      paddingLeft: 15,
      paddingRight: 15
    },
    textStyle: {
      normal: {
        color: 'white',
        fontSize: FONT_SIZE,
        fontWeight: 'normal',
      },
      error: {
        color: 'white',
        fontSize: FONT_SIZE,
        fontWeight: 'normal',
      }
    }
  },
  errorBlock: {
    fontSize: ERROR_FONT_SIZE,
    marginTop: 4,
    marginBottom: 4,
    color: ERROR_COLOR
  },
  checkbox: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  select: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  },
  datepicker: {
    normal: {
      marginBottom: 4
    },
    // the style applied when a validation error occours
    error: {
      marginBottom: 4
    }
  }
};
