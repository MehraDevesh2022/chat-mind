import React, { useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyChats from "../component/Chat/MyChats/MyChats";
import ChatBox from "../component/Chat/ChatBox/ChatBox";
import SiderDrawer from "../component/Chat/SideDrawer/SiderDrawer";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

import { clearError } from "../action/userAction";
import Loader from "../component/utiils/Loader";

function ChatPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const alert = useAlert();
  const [fetchAgain, setFetchAgain] = useState(false);
  const { error, isAuthenticated, loading } = useSelector(
    (state) => state.UserData
  );

  console.log(isAuthenticated);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [dispatch, alert, error, isAuthenticated, history]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div style={{ width: "100%" }}>
            {isAuthenticated && <SiderDrawer />}
            <Box
              d="flex"
              justifyContent="space-between"
              w="100%"
              h="91.5vh"
              p="10px"
            >
              {isAuthenticated && <MyChats fetchAgain={fetchAgain} />}
              {isAuthenticated && (
                <ChatBox
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              )}
            </Box>
          </div>
        </>
      )}
    </>
  );
}

export default ChatPage;
