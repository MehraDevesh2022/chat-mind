import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createUserReducer ,logoutUserReducer } from "./reducer/userReducer";
import { createChatReducer , removeGroupChatReducer} from "./reducer/chatReducer";

const rootReducer = combineReducers({

    UserData  : createUserReducer, 
    UserLogout : logoutUserReducer,
    ChatData : createChatReducer,
    mutateChat : removeGroupChatReducer,
})


const middleware  = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;