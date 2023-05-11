import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createUserReducer ,logoutUserReducer ,getAllUserReducer} from "./reducer/userReducer";
import { createChatReducer , removeGroupChatReducer} from "./reducer/chatReducer";
import { getAllMessageReducer , sendMessageReducer } from "./reducer/messageReducer";
const rootReducer = combineReducers({

    UserData  : createUserReducer, 
    UserLogout : logoutUserReducer,
    AllUserData : getAllUserReducer,
    ChatData : createChatReducer,
    mutateChat : removeGroupChatReducer,
    MessageData : getAllMessageReducer,
    sendMessage : sendMessageReducer,
})


const middleware  = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;