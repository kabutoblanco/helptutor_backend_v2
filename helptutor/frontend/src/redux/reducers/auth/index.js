import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  SET_ROLE,
} from '../../actions/auth/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  roles: [],
  roleCurrent: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        roleCurrent: null,
      };
    case SET_ROLE:
      return {
        ...state,
        roleCurrent: action.payload,
      };
    default:
      return state;
  }
}
