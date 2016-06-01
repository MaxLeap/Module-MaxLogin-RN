'use strict';

import Actions from '../actionTypes';
const {
  REGISTER_REQUEST_START,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILURE,
  REGISTER_CLEANUP,
  REGISTER_FORMFIELD_CHANGE
} = Actions;

import InitialState from '../initialState/register';
import formValidation from './formValidation';
import fieldValidation from '../utils/fieldValidation';

let initialState = new InitialState();

function status(state=initialState.status, action={}) {
  switch (action.type) {
    case REGISTER_CLEANUP:
    case REGISTER_FORMFIELD_CHANGE: {
      return state.setIn(['error'], null);
    }

    case REGISTER_REQUEST_START: {
      return state.setIn(['isFetching'], true)
                  .setIn(['error'], null);
    }

    case REGISTER_REQUEST_SUCCESS:{
      return state.setIn(['isFetching'], false);
    }

    case REGISTER_REQUEST_FAILURE:{
      return state.setIn(['isFetching'], false)
                  .setIn(['error'], action.payload);
    }

    default:
      return state;
  }
}

function fields(state=initialState.fields, action={}) {
  switch (action.type) {
    case REGISTER_FORMFIELD_CHANGE: {
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
