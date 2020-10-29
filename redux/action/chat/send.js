import axios from 'axios';

import {
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_ERROR,
  SEND_MESSAGE_LOADING,
} from '../actionType';

export const loading = (loading) => {
  return {type: SEND_MESSAGE_LOADING, loading};
};

export const success = (data) => {
  return {type: SEND_MESSAGE_SUCCESS, message: data};
};

export const error = (error) => {
  return {type: SEND_MESSAGE_ERROR, error};
};

export const retrived = (value) => {
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const res = await axios.post(
        'http://c7f4c1f5a2cb.ngrok.io/messages',
        value,
      );

      dispatch(success(res?.data?.data));
      dispatch(loading(false));
    } catch (error) {
      dispatch(error(error));
      dispatch(loading(false));
    }
  };
};
