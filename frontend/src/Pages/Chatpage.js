import { Box } from "@chakra-ui/layout";
import { useState  } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import MetaData from "../components/layouts/MetaData/Metadata";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false); 
  const { user  } = ChatState();
;


  return (
    <>
      <MetaData title="Chat" />
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          d="flex"
          justifyContent="space-between"
          w="100%"
          h="91.5vh"
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>
  );
};

export default Chatpage;
