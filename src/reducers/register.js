'use strict';

import Actions from '../actionTypes';
const {
  USER_REGISTER,
  USER_REGISTER_REQUEST_START,
  USER_REGISTER_REQUEST_SUCCESS,
  USER_REGISTER_REQUEST_FAILURE,
  USER_REGISTER_INIT_START,
  USER_REGISTER_FORMFIELD_CHANGE
} = Actions;

import InitialState from '../initialState/register';
import formValidation from './formValidation';
import fieldValidation from '../utils/fieldValidation';

let initialState = new InitialState();

function status(state=initialState.status, action={}) {
  switch (action.type) {
    case USER_REGISTER_INIT_START:
    case USER_REGISTER_FORMFIELD_CHANGE: {
      return state.setIn(['error'], null);
    }

    case USER_REGISTER_REQUEST_START:{
      return state.setIn(['isFetching'], true)
                  .setIn(['error'], null);
    }

    case USER_REGISTER_REQUEST_SUCCESS:{
      return state.setIn(['isFetching'], false);
    }

    case USER_REGISTER_REQUEST_FAILURE:{
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload);
    }

    default:
      return state;
  }
}

function fields(state=initialState.fields, action={}) {
  switch (action.type) {
    case USER_REGISTER_FORMFIELD_CHANGE: {
      const {field, value} = action.payload;
      let nextState =  state.setIn([field], value);
      return fieldValidation(nextState, action);
    }

    default:
      return state;
  }
}

export default function register(state=initialState, action={}) {
  return formValidation(
    state.setIn(['status'], status(state.status, action))
         .setIn(['fields'], fields(state.fields, action)),
    action);
}
