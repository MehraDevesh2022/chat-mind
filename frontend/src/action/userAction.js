import axios from "axios";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
   GETALL_USER_REQUEST,
  GETALL_USER_SUCCESS,
  GETALL_USER_FAIL,
  CLEAR_ERRORS,
} from "../constant/user";

// SIGNUP USER
export const createUser = (signupData) => async (dispatch) => {
  try {
    console.log("userData", signupData);
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    const { data } = await axios.post(`/api/v1/user/register`, signupData, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.message });
  }
};

// login user
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      config
    );
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data.user });
  } catch (error) {
    console.log("hello");
    dispatch({ type: LOGIN_USER_FAIL, payload: error.message });
  }
};

// load user
export const loadUser = () => async (dispatch) => {
  try {
    console.log("hello");
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/user/load");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.message });
  }
};

// logout user
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_USER_REQUEST });
    const { data } = await axios.get("/api/v1/user/logout");
    dispatch({ type: LOGOUT_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGOUT_USER_FAIL, payload: error.message });
  }

};


// get all users
export const getAllUsers = (search) => async (dispatch) => {
  try {
    dispatch({ type: GETALL_USER_REQUEST });
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.get(`/api/v1/user?search=${search}`, config);
    dispatch({ type: GETALL_USER_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({ type: GETALL_USER_FAIL, payload: error.message });
  }
};

// clear error =>
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
