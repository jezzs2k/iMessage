import {
  MESSAGE_LOADING,
  MESSAGE_ERROR,
  MESSAGE_RESET,
  MESSAGE_SUCCESS,
} from '../../action/actionType';
import {combineReducers} from 'redux';

export const loading = (state = false, action) => {
  switch (action.type) {
    case MESSAGE_LOADING:
      return action.loading;

    case MESSAGE_RESET:
      return false;

    default:
      return state;
  }
};

export const error = (state = null, action) => {
  switch (action.type) {
    case MESSAGE_ERROR:
      return action.error;

    case MESSAGE_RESET:
      return null;

    default:
      return state;
  }
};

export const retrived = (state = null, action) => {
  switch (action.type) {
    case MESSAGE_SUCCESS:
      return action.messages;

    case MESSAGE_RESET:
      return null;

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  error,
  retrived,
});
