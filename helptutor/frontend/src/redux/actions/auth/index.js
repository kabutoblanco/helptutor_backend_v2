// AXIOS
import axios from 'axios';

// REDUX
import { tokenConfig } from '../utils';
import { returnErrors } from '../messages';

// TYPES
import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from './types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  axios
    .get('api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const login = (data) => (dispatch) => {
  axios
    .post('api/auth/login', data)
    .then((res) => {
      console.log(res)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post('api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
