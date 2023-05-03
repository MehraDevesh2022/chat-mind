import axios from "axios";
import {
  REGITER_USER_REQUEST,
  REGITER_USER_SUCCESS,
  REGITER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CLEAR_ERRORS
} from "../constant/user";


// SIGNUP USER 
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


export const  loginUser  = (email , password) => async(dispatch) =>{
  
     try {
            dispatch({type : LOGIN_USER_REQUEST});
            const config = {headers :{'Content-Type'  : "application/json"}};
            const {data} = await axios.post("/api/v1/login" ,{ email , password }, config);
             dispatch({type : LOGIN_USER_SUCCESS ,  payload : data})

     } catch (error) {
            dispatch({type : LOGIN_USER_FAIL , payload : error.message})
     }
}

// clear error =>
export  const clearError  = () => async(dispatch) =>{
  
    dispatch({type : CLEAR_ERRORS});

}