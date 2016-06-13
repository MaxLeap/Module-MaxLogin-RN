
# Module MaxLogin RN [![npm version](https://badge.fury.io/js/maxlogin-react-native.svg)](http://badge.fury.io/js/maxlogin-react-native)

基于 MaxLeap SDK 的登录 UI 组件。

## 功能特点：

`maxlogin-react-native` 是一个登录界面组件，它实现了用户名密码登录界面、注册、手机号登录三个界面。

组件使用 `react-native-redux` 框架实现。

## 入门指南

### 安装

1. **重要：**先安装 `maxleap-react-native`, 参照 [MaxLeap 开发文档](http://badge.fury.io/js/maxleap-react-native)

2. 安装 `maxlogin-react-native`

	```
	npm install --save maxlogin-react-native
	```

3. 打开 Finder，找到本项目的根目录，使用 Xcode 打开 iOS 工程（双击 .xcodeproj 文件即可），然后导航到 `/node_modules/maxlogin-react-native/ios/lib` 目录，把该目录下的 frameworks 都拖到 Xcode 工程中

### API

导入本模块：

```
import * as MaxLogin from 'maxlogin-react-native';
```

**重要：**首先需要熟悉 `redux` 框架，https://github.com/reactjs/redux ， 还有 [`react-redux`](https://github.com/reactjs/react-redux)

#### `InitialState`

一个 `immutable` 的 [`Record`](http://facebook.github.io/immutable-js/docs/#/Record) 对象，使用时需要把它的一个实例放到整个应用程序的 initialState 的顶层，并且字段名**必须**是 `maxlogin`： 

```
const initState = {
  maxlogin: new MaxLogin.InitialState()
};
```

`InitialState` 包含一个 `currentUser` 字段，用来存放当前登录的用户

#### `reducers`

此模块中的 reducers, 需要合并到 RootReducer 中:

```
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  ...MaxLogin.reducers, 
  ...otherReducers
});
```

#### `setCurrentUser(user)`

**一个 Action ,** 用来设置当前登录用户，可以传入 `null`

**注意：**这是一个 Action, 直接调用不能达到期望的效果, 使用方法如下： 

```
// 创建 store 对象
const store = createStore(rootReducers, initState, applyMiddleware(thunk));

store.dispatch(MaxLogin.setCurrentUser(user))
```

#### `Register`

注册组件，调用 `MaxLeap.User.signUp` 方法，使用用户名密码注册，可以嵌入其他 View 中使用。

属性 | 类型 | 默认值 | 描述
----|------|-------|----
onSuccess | `function` |  | 注册成功的回调<br>参数：`user` 注册成功的用户对象
onFailure | `function` |  | 注册失败的回调<br>参数：`error` 错误对象
onSubmit  | `function` |  | 处理表单按钮点击事件，如果不为空，则内置处理器不会再响应，也就是不会再走内置注册流程

#### `Login`

登录组件, 调用 `MaxLeap.User.logIn` 接口，使用用户名密码登录，可以嵌入其他 View 中使用。

属性 | 类型 | 默认值 | 描述
----|------|-------|----
onSuccess | `function` |  | 登录成功的回调<br>参数：`user` 登录成功的用户对象
onFailure | `function` |  | 登录失败的回调<br>参数：`error` 错误对象
onSubmit  | `function` |  | 处理表单按钮点击事件，如果不为空，则内置处理器不会再响应，也就是不会再走内置登录流程

#### `PhoneLogin`

手机号登录组件，可以嵌入其他 View 中使用。使用该组件登录不需要注册，仅点击获取验证码，填写验证码就可以登录。

属性 | 类型 | 默认值 | 描述
----|------|-------|----
onSuccess | `function` |  | 登录成功的回调<br>参数：`user` 登录成功的用户对象
onFailure | `function` |  | 登录失败的回调<br>参数：`error` 请求错误
onSubmit  | `function` |  | 处理表单按钮点击事件，如果不为空，则内置处理器不会再响应，也就是不会再走内置登录流程
waitSeconds | `number` |60| 获取验证码按钮的冷却时间，冷却期间，按钮不可点击, **单位：秒**
onSmsRequestSuccess | `function` | | 验证码请求成功的回调
onSmsRequestFailure | `function` | | 验证码请求失败的回调<br>参数：`error` 请求错误

### 示例

**重要：**首先需要熟悉 `redux` 框架，https://github.com/reactjs/redux ， 还有 [`react-redux`](https://github.com/reactjs/react-redux)

在应用最上层的 index.js 中，

```js

import React, { Component } from 'react';
import ReactNative { AppRegistry, View } from 'react-native';

import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';

// thunk 必须集成
import thunk from 'redux-thunk';

import MaxLeap from 'maxleap-react-native';
import * as MaxLogin from 'maxlogin-react-native';


export default function main(platform) {

  // 集成 MaxLogin 中的 reducers
  const rootReducers = combineReducers(MaxLogin.reducers);
  
  // 集成 MaxLogin 的 InitialState, 注意，这里的字段名必须为 maxlogin
  const initState = {
    maxlogin: new MaxLogin.InitialState()
  };
  
  // 创建 store 对象
  const store = createStore(rootReducers, initState, applyMiddleware(thunk));


  class example extends Component {
    render() {
      return (
        <Provider store={store}>
          <View />
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
    
      // 下面这行代码会触发修改 state.maxlogin.currentUser 的操作
      store.dispatch(MaxLogin.setCurrentUser(user))
    }
  }).catch(err => {
    console.log(err);
  })

  AppRegistry.registerComponent('example', () => example);
}
```

接下来就可以使用登录界面了：

```js
import React, { Component } from 'react';
import ReactNative, { ScrollView } from 'react-native';

import * as MaxLogin from 'maxlogin-react-native';

export default class Login extends Component {
  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <MaxLogin.Login
          style={{flex: 0}}
          onSuccess={user => {
            // 用户登录成功
            console.log(user);
          }}
          onFailure={err => {
            // 用户登录失败
            alert(err)
          }}/>
      </ScrollView>
    );
  }
}

```



