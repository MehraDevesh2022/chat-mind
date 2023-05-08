
import {
  CREATECHAT_CHAT_REQUEST,
  CREATECHAT_CHAT_SUCCESS,
  CREATECHAT_CHAT_FAIL,
  CREATEGROUP_CHAT_REQUEST,
  CREATEGROUP_CHAT_SUCCESS,
  CREATEGROUP_CHAT_FAIL,
  GETALL_CHAT_REQUEST,
  GETALL_CHAT_SUCCESS,
  GETALL_CHAT_FAIL,
  REMOVEGROUP_CHAT_REQUEST,
  REMOVEGROUP_CHAT_SUCCESS,
  REMOVEGROUP_CHAT_FAIL,
  REMOVEGROUP_CHAT_RESET,
  ADDTOGROUP_CHAT_REQUEST,
  ADDTOGROUP_CHAT_SUCCESS,
  ADDTOGROUP_CHAT_FAIL,
  ADDTOGROUP_CHAT_RESET,
  RENAMEGROUP_CHAT_REQUEST,
  RENAMEGROUP_CHAT_SUCCESS,
  RENAMEGROUP_CHAT_FAIL,
  RENAMEGROUP_CHAT_RESET,
  CLEAR_ERRORS,
} from "../constant/chat";

// CREATE ONE TO ONE CHAT
export const createChatReducer = (state = { chat: {} }, action) => {

  switch (action.type) {
    case CREATECHAT_CHAT_REQUEST:
    case CREATEGROUP_CHAT_REQUEST:
    case GETALL_CHAT_REQUEST:
      
      return {
        loading: true,
        ...state,
      };

    case CREATECHAT_CHAT_SUCCESS:
    case CREATEGROUP_CHAT_SUCCESS:
    case GETALL_CHAT_SUCCESS:
      return {
        loading: false,
        chat: action.payload,
      };

    case CREATECHAT_CHAT_FAIL:
    case CREATEGROUP_CHAT_FAIL:
    case GETALL_CHAT_FAIL:
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




// remove group chat
export const removeGroupChatReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVEGROUP_CHAT_REQUEST:
    case ADDTOGROUP_CHAT_REQUEST:
    case RENAMEGROUP_CHAT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case REMOVEGROUP_CHAT_SUCCESS:
    case ADDTOGROUP_CHAT_SUCCESS:
    case RENAMEGROUP_CHAT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case REMOVEGROUP_CHAT_FAIL:
    case ADDTOGROUP_CHAT_FAIL:
    case RENAMEGROUP_CHAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case REMOVEGROUP_CHAT_RESET:
    case ADDTOGROUP_CHAT_RESET:
    case RENAMEGROUP_CHAT_RESET:
      return {
        ...state,
        success: false,
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



