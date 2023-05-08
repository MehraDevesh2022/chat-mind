import axios from "axios";

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

  ADDTOGROUP_CHAT_REQUEST,
  ADDTOGROUP_CHAT_SUCCESS,
  ADDTOGROUP_CHAT_FAIL,
  
  RENAMEGROUP_CHAT_REQUEST,
  RENAMEGROUP_CHAT_SUCCESS,
  RENAMEGROUP_CHAT_FAIL,

  CLEAR_ERRORS,
} from "../constant/chat";

// CREATE ONE TO ONE CHAT
export const createChat = (userId) => async (dispatch) => {
  try {
    dispatch({ type: CREATECHAT_CHAT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(`/api/v1/chat`, userId, config);

    dispatch({ type: CREATECHAT_CHAT_SUCCESS, payload: data.chatData });
  } catch (error) {
    dispatch({ type: CREATECHAT_CHAT_FAIL, payload: error.message });
  }
};

// CREATE GROUP CHAT
export const createGroupChat = (groupData) => async (dispatch) => {
  try {
    dispatch({ type: CREATEGROUP_CHAT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/chat/create/group`,
      groupData,
      config
    );

    dispatch({ type: CREATEGROUP_CHAT_SUCCESS, payload: data.chatData });
  } catch (error) {
    dispatch({ type: CREATEGROUP_CHAT_FAIL, payload: error.message });
  }
};

// GET ALL CHAT
export const getAllChat = () => async (dispatch) => {
  try {
    dispatch({ type: GETALL_CHAT_REQUEST });

    const { data } = await axios.get(`/api/v1/chat`);

    dispatch({ type: GETALL_CHAT_SUCCESS, payload: data.chatData });
  } catch (error) {
    dispatch({ type: GETALL_CHAT_FAIL, payload: error.message });
  }
};

// REMOVE GROUP CHAT
export const removeGroupChat = (chatId, userId) => async (dispatch) => {
  try {
    dispatch({ type: REMOVEGROUP_CHAT_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.delete(
      "/api/v1/chat/remove/group",
      { chatId, userId },
      config
    );

    dispatch({ type: REMOVEGROUP_CHAT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: REMOVEGROUP_CHAT_FAIL, payload: error.message });
  }
};


// ADD USER TO GROUP CHAT
export const addUserToGroupChat = (chatId, userId) => async (dispatch) => {
    try {
        dispatch({ type: ADDTOGROUP_CHAT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.put(
        "/api/v1/chat/add/group",
        { chatId, userId },
        config
        );
    
        dispatch({ type: ADDTOGROUP_CHAT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: ADDTOGROUP_CHAT_FAIL, payload: error.message });
    }
    }


// RENAME GROUP CHAT
export const renameGroupChat = (chatId, chatName) => async (dispatch) => {
    try {
        dispatch({ type: RENAMEGROUP_CHAT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
    
        const { data } = await axios.put(
        "/api/v1/chat/rename/group",
        { chatId, chatName },
        config
        );
    
        dispatch({ type: RENAMEGROUP_CHAT_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({ type: RENAMEGROUP_CHAT_FAIL, payload: error.message });
    }
    }

// clear error =>
export const clearError = () => async (dispatch) => {

    dispatch({ type: CLEAR_ERRORS });
  }

