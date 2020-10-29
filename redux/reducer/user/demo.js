import {
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
} from '../../action/actionType';
import {combineReducers} from 'redux';

export const loading = (state = false, action) => {
  switch (action.type) {
    case USER_LOGIN_LOADING:
      return action.loading;

    default:
      return state;
  }
};

export const error = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN_FAIL:
      return action.error;

    default:
      return state;
  }
};

export const retrived = (state = null, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return action.user;

    default:
      return state;
  }
};

export default combineReducers({
  loading,
  error,
  retrived,
});
