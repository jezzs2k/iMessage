import {
  USER_AUTH_FAIL,
  USER_AUTH_LOADING,
  USER_AUTH_LOGOUT,
  USER_AUTH_SUCCESS,
} from '../actionType';
import jwtDecode from 'jwt-decode';

export const loading = (loading = false) => {
  return {type: USER_AUTH_LOADING, loading};
};

export const authSuccess = ({token, user}) => {
  return {type: USER_AUTH_SUCCESS, token, user};
};

export const authFail = (error) => {
  return {type: USER_AUTH_FAIL, error};
};

export const logout = () => {
  return {type: USER_AUTH_LOGOUT};
};

export const reset = () => {
  return (dispatch) => {
    dispatch(authFail());
    dispatch(loading(false));
  };
};

export const authenticate = () => {
  return (dispatch) => {
    dispatch(logout());
    dispatch(reset());
    dispatch(loading(true));

    return async () => {
      try {
        //fetch token
      } catch (error) {
        dispatch(authFail(error));
        dispatch(loading(false));
      }
    };
  };
};

export const authCheckState = (token) => {
  return (dispatch) => {
    if (!token) {
      dispatch(logout());
    } else {
      const user = jwtDecode(token);
      let expirationDate = new Date();
      expirationDate.setTime(user.exp * 1000);

      const today = new Date();

      if (expirationDate.getTime() <= today.getTime()) {
        console.log('Token has expired, you have been disconnected');
        dispatch(logout());
      } else {
        // set_token(token)
        // set_authUser(user)
        dispatch(authSuccess(token, user));
      }
    }
  };
};
