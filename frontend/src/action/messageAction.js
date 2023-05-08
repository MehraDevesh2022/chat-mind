import axios from "axios";

import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CLEAR_ERRORS,
  GETALL_MESSAGE_FAIL,
  GETALL_MESSAGE_SUCCESS,
  GETALL_MESSAGE_FAIL,

  GETALL_MESSAGE_REQUEST
} from "../constant/message";

// get all messages
export const getAllMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({ type: GETALL_MESSAGE_REQUEST });

    const { data } = await axios.get(`/api/v1/message/${chatId}`);

    dispatch({ type: GETALL_MESSAGE_SUCCESS, payload: data.messages });
  } catch (error) {
    dispatch({ type: GETALL_MESSAGE_FAIL, payload: error.message });
  }
};

// send message
export const sendMessage = (content, chatId) => async (dispatch) => {
  try {
    dispatch({ type: SEND_MESSAGE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/message`,
      { content, chatId },
      config
    );

    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: SEND_MESSAGE_FAIL, payload: error.message });
  }
};

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
    }