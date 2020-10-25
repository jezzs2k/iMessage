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
  return {type: MESSAGE_SUCCESS, retrived};
};

export const error = (error) => {
  return {type: MESSAGE_ERROR, error};
};

export const reset = () => {
  return {type: MESSAGE_RESET};
};

export const retrive = () => {
  return (dispatch) => {
    dispatch(loading(true));
    dispatch(reset());
    try {
      //fetch message
    } catch (error) {
      dispatch(error(error));
      dispatch(loading(false));
    }
  };
};
