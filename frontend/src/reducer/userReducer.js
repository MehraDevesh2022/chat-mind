import {
  REGITER_USER_REQUEST,
  REGITER_USER_SUCCESS,
  REGITER_USER_FAIL,
  CLEAR_ERRORS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
} from "../constant/user";

export const createUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGITER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return {
        loading: true,
        isAutenticated: false,
        ...state,
      };
    case REGITER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        loading: false,
        user: action.paylaod,
        isAutenticated: true,
      };
    case REGITER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        loading: false,
        isAutenticated: false,
        error: action.paylaod,
        user: null,
        ...state,
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
