import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  CLEAR_ERRORS,
  GETALL_MESSAGE_FAIL,
  GETALL_MESSAGE_SUCCESS,
  GETALL_MESSAGE_FAIL,
  GETALL_MESSAGE_REQUEST,
} from "../constant/message";

// get all messages
 export const getAllMessageReducer = (state = { messages: [] }, action) => {
    switch (action.type) {
      case GETALL_MESSAGE_REQUEST:
        return {
          loading: true,
          messages: [],
        };
      case GETALL_MESSAGE_SUCCESS:
        return {
          loading: false,
          messages: action.payload,
        };
      case GETALL_MESSAGE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          error: null,
          ...state,
        };
      default:
        return state;
    }
  }


  // send message
export const sendMessageReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        loading: false,
        message: action.payload,
      };
    case SEND_MESSAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
        ...state,
      };
    default:
      return state;
  }
}