import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  CLEAR_ERRORS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from "../constant/user";

export const createUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        ...state,
      };

    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
     
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.paylaod,
        user: null,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };

    default:
      return state;
  }
};
