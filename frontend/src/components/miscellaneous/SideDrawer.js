import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import "./SideDrawer.css";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon ,  DeleteIcon, EditIcon, ExternalLinkIcon, SettingsIcon  } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
       
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#28293D"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        borderColor="#555770"
        color="#EBEBF0"
      >
        <Tooltip
          label="Search Users to chat"
          hasArrow
          placement="bottom-end"
          bgGradient="linear(to-r, #3E7BFA, #6600CC)"
          color="#FFFFFF"
          _hover={{
            bg: "#555770",
            color: "#FFFFFF",
          }}
        >
          <Button
            variant="ghost"
            onClick={onOpen}
            _hover={{
              bg: "#555770",
            }}
            _active={{
              bg: "transparent",
              color: "#FFFFFF",
            }}
          >
            <i className="fas fa-search"></i>
            <Text
              d={{ base: "none", md: "flex" }}
              px={4}
              _hover={{
                bg: "#555770",
              }}
            >
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text
          fontSize="2.5rem"
          fontWeight="bold"
          textTransform="uppercase"
          display="inline-block"
          bgGradient="linear(to-r, #FF3B3B, #6600CC)"
          bgClip="text"
          cursor="pointer"
          textShadow="2px 2px 8px rgba(0, 0, 0, 0.6)" // Update the shadow effect
        >
          ChatMind
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} bg="#28293D" color="white">
              {!notification.length && <MenuItem>No New Messages</MenuItem>}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="transparent" _hover={{ bg: "#555770" }}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
              <ChevronDownIcon _hover={{ color: "#6600CC" }} />
            </MenuButton>
            <MenuList bg="#28293D" border="none" shadow="none" p={0}>
              <Box p={2} textAlign="center">
                <Avatar size="md" name={user.name} src={user.pic} mb={2} />
                <Box fontSize="sm">
                  <strong>ID:</strong> 628c511114 <br />
                  <strong>Name:</strong> DEVESH MEHRA <br />
                  <strong>Email:</strong> dev.mehara97@gmail.com <br />
                  <strong>Created At:</strong> 05/11/2023 10:33 AM
                </Box>
              </Box>
              <MenuDivider />
              <ProfileModal user={user}>
                <MenuItem _hover={{ bg: "#555770" }}>
                  <EditIcon mr={2} boxSize={4} />
                  Profile
                </MenuItem>
              </ProfileModal>
              <MenuItem _hover={{ bg: "#555770" }}>
                <DeleteIcon mr={2} boxSize={4} />
                Delete Account
              </MenuItem>

              <MenuItem _hover={{ bg: "#555770" }}>
                <SettingsIcon mr={2} boxSize={4} />
                Settings
              </MenuItem>
              <MenuItem _hover={{ bg: "#555770" }} onClick={logoutHandler}>
                <ExternalLinkIcon mr={2} boxSize={4} />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#28293D" color="#28293D">
          <DrawerHeader
            borderBottomWidth="1px"
            fontWeight="bold"
            textTransform="uppercase"
            display="inline-block"
            bgGradient="linear(to-r, #FF3B3B, #6600CC)"
            bgClip="text"
            cursor="pointer"
            textShadow="2px 2px 8px rgba(0, 0, 0, 0.6)"
            textAlign="center"
            fontSize="2rem"
          >
            ChatMind
          </DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                color="#F2F2F5"
                bg="#555770"
              />
              <Button
                onClick={handleSearch}
                color="#F2F2F5"
                bg="#555770"
                _hover={{
                  bg: "#6600CC",
                  color: "#F2F2F5",
                  boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
                }}
                _active={{
                  bg: "#6600CC",
                  color: "#F2F2F5",
                  boxShadow: "none",
                }}
                p={3}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
         
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
