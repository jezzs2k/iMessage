import axios from 'axios';

import {
  MESSAGE_SUCCESS,
  MESSAGE_ERROR,
  MESSAGE_RESET,
  MESSAGE_LOADING,
} from '../actionType';

export const loading = (loading) => {
  return {type: MESSAGE_LOADING, loading};
};

export const success = (retrived) => {
  return {type: MESSAGE_SUCCESS, messages: retrived};
};

export const error = (error) => {
  return {type: MESSAGE_ERROR, error};
};

export const reset = () => {
  return {type: MESSAGE_RESET};
};

export const retrive = () => {
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const res = await axios.get(
        'http://d0482243d967.ngrok.io/messages/5f9622cec31e8b0917009e2a',
      );

      dispatch(success(res?.data?.data));
      dispatch(loading(false));
    } catch (error) {
      dispatch(error(error));
      dispatch(loading(false));
    }
  };
};
