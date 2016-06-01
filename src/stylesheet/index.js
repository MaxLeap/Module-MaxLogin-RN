'use strict';

import formStyle from './form';

/**
* ## Styles
*/
const containerStyle = {
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    normal: {
      borderRadius: 3,
      backgroundColor: '#27ae60',
      borderColor: '#27ae60'
    },
    disabled: {
      borderRadius: 3,
      backgroundColor: '#8f8f8f',
      borderColor: '#8f8f8f'
    },
    textStyle: {
      color: 'white'
    }
  },
  formStyle
};

export default containerStyle;
