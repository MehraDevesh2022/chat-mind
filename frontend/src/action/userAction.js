import axios from "axios";
import {
  REGITER_USER_REQUEST,
  REGITER_USER_SUCCESS,
  REGITER_USER_FAIL,
} from "../constant/user";

export const createUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGITER_USER_REQUEST });

    const config = { headers: { "Content-Type": "/multipart/form-data" } };
    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch({ type: REGITER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: REGITER_USER_FAIL, payload: error.message });
  }
};
