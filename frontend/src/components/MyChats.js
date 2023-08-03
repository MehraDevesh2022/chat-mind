import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css"
const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="#28293D"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="2px"
      borderColor="#555770"
    >
      <Box
        pb={1}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work Sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
        color="#E4E4EB"
        borderRadius="md"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
        background="#1C1C28"
      >
        <Box
          fontWeight="bold"
          textShadow="3px 3px 6px rgba(0, 0, 0, 0.5)"
          className="heading"
        >
          All Chats
        </Box>
        <GroupChatModal className="modal">
          <Button
            className="chatBtn"
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            color="#E4E4EB"
            bg="linear-gradient(147.14deg, #FF3B3B 6.95%, #6600CC 93.05%)"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.6)"
            boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
            _hover={{
              // Add hover effect styles
              transform: "scale(1.1)",
              bg: "#6600CC",
            }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      ;
      <Box
        d="flex"
        flexDir="column"
        p={3}
        background="#1C1C28"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
        boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#6600CC" : "#555770"}
                color={selectedChat === chat ? "#E4E4EB" : "#F2F2F5"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                boxShadow="2px 2px 4px rgba(0, 0, 0, 0.5)"
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
