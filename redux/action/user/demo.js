import {
  USER_LOGIN_FAIL,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
} from '../actionType';
import axios from 'axios';

export const loading = (loading = false) => {
  return {type: USER_LOGIN_LOADING, loading};
};

export const success = (user) => {
  return {type: USER_LOGIN_SUCCESS, user};
};

export const error = (error) => {
  return {type: USER_LOGIN_FAIL, error};
};

export const retrive = ({email}) => {
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const res = await axios.get(
        `http://c7f4c1f5a2cb.ngrok.io/users/demo/${email}`,
      );

      dispatch(success(res.data.data));
      dispatch(loading(false));
    } catch (error) {
      dispatch(loading(false));
    }
  };
};
