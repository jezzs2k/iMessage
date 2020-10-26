import {
  SEND_MESSAGE_LOADING,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_SUCCESS,
} from '../../action/actionType';
import {combineReducers} from 'redux';

export const loading = (state = false, action) => {
  switch (action.type) {
    case SEND_MESSAGE_LOADING:
      return action.loading;

    default:
      return state;
  }
};

export const error = (state = null, action) => {
  switch (action.type) {
    case SEND_MESSAGE_ERROR:
      return action.error;

    default:
      return state;
  }
};

export const retrived = (state = null, action) => {
  switch (action.type) {
    case SEND_MESSAGE_SUCCESS:
      return action.message;

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  error,
  retrived,
});
