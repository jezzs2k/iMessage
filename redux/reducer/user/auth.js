import {combineReducers} from 'redux';
import {
  USER_AUTH_LOGOUT,
  USER_AUTH_FAIL,
  USER_AUTH_LOADING,
  USER_AUTH_SUCCESS,
} from '../../action/actionType';

export const error = (state = null, action) => {
  switch (action.type) {
    case USER_AUTH_FAIL:
      return action.error;
    default:
      return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
    case USER_AUTH_LOADING:
      return action.loading;

    default:
      return state;
  }
};

export const token = (state = null, action) => {
  switch (action.type) {
    case USER_AUTH_SUCCESS:
      return action.token;
    case USER_AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
};

export const authenticated = (state = null, action) => {
  switch (action.type) {
    case '':
      return action.user;
    case USER_AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
  token,
  authenticated,
  error,
});
