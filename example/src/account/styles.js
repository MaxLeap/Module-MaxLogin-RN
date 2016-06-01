'use strict';

import { stylesheet } from 'maxlogin-react-native';

let styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  account: {
    ...stylesheet,
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#FEFEFE'
    }
  }
};

console.log(stylesheet);
styles.account.formStyle.helpBlock.normal.backgroundColor = '#007F00';
styles.account.formStyle.helpBlock.normal.borderColor = '#007F00';

export default styles;
