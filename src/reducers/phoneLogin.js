'use strict';

import ActionTypes from '../actionTypes';
const {
  SMSCODE_REQUEST_START,
  SMSCODE_REQUEST_SUCCESS,
  SMSCODE_REQUEST_FAILURE,

  SMSCODE_COUNTDOWN_START,
  SMSCODE_COUNTDOWN,
  SMSCODE_COUNTDOWN_END,

  PHONE_LOGIN_REQUEST_START,
  PHONE_LOGIN_REQUEST_SUCCESS,
  PHONE_LOGIN_REQUEST_FAILURE,

  PHONE_LOGIN_CLEANUP,
  PHONE_LOGIN_FORMFIELD_CHANGE
} = ActionTypes;

import InitialState from '../initialState/phoneLogin';
import formValidation from './formValidation';
import fieldValidation from '../utils/fieldValidation';

let initialState = new InitialState();

function status(state=initialState.status, action={}) {
  switch (action.type) {
    case PHONE_LOGIN_CLEANUP:
    case PHONE_LOGIN_FORMFIELD_CHANGE: {
      return state.setIn(['error'], null);
    }

    case PHONE_LOGIN_REQUEST_START:{
      return state.setIn(['isFetching'], true)
                  .setIn(['error'], null);
    }

    case PHONE_LOGIN_REQUEST_SUCCESS:{
      return state.setIn(['isFetching'], false);
    }

    case PHONE_LOGIN_REQUEST_FAILURE:{
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload);
    }

    default:
      return state;
  }
}

function fields(state=initialState.fields, action={}) {
  switch (action.type) {
    case PHONE_LOGIN_FORMFIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =  state.setIn([field], value);
      return fieldValidation(nextState, action);
    }

    case SMSCODE_COUNTDOWN_START: {
      return state.setIn(['isCounting'], true)
                  .setIn(['countValue'], action.value);
    }

    case SMSCODE_COUNTDOWN: {
      return state.setIn(['countValue'], state.countValue - (action.decrement||0));
    }

    case SMSCODE_COUNTDOWN_END: {
      return state.setIn(['isCounting'], false);
    }

    default:
      return state;
  }
}

export default function phoneLogin(state=initialState, action={}) {
  return formValidation(
    state.setIn(['status'], status(state.status, action))
         .setIn(['fields'], fields(state.fields, action)),
    action);
}
