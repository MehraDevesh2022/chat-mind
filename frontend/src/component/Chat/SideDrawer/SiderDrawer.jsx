import React, { useEffect, useState } from "react";
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
import ChatLoading from "../../utiils/ChatLoading";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import UserListItem from "../../config/UserListItem";
import { getSender } from "../../config/ChatLogic";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser  , getAllUsers , clearError} from "../../../action/userAction";


function SiderDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [loadingChat, setLoadingChat] = useState(false);
const [notification, setNotification] = useState([]);

  const { users, loading, error } = useSelector((state) => state.AllUserData);
   const { user } = useSelector((state) => state.UserData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();


          useEffect(() => {
            if(error){
              alert.error(error);
              dispatch(clearError());
            }
            if(users){
              setSearchResult(users);
            }
          }, [dispatch, alert, error, users]);
       

  // logout handler
  const logoutHandler = () => {
    dispatch(logoutUser());
    history.push("/");
  };


  // search handler
  const handleSearch = async () => {
    if (search.trim() === "") {
     alert.error("Please enter something to search");
      return;
    }
    
    dispatch(getAllUsers(search))
  }


  // access chat handler
  const accessChat = async (userId) => {
     

  }

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
          <Text fontSize="2xl" fontFamily="Work sans">
            Talk-A-Tive
          </Text>
        </Tooltip>

        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
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
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList>
              {/* // Profile Modal Component  */}
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
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

export default SiderDrawer;
