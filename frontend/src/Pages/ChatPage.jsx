import React, { useState, useEffect } from "react";
import axios from "axios";

function ChatPage() {
  const [chatData, setChatData] = useState([]);

 
  async function fetchData() {
    try {
      const {data} = await axios.get("/api/v1/chat");
      console.log(data.chats);
      setChatData(data.chats)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      {chatData &&
        chatData.map((chat) => <li key={chat._id}>{chat.chatName}</li>)}
    </>
  );
}

export default ChatPage;
