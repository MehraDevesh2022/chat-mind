import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createUserReducer } from "./reducer/userReducer";


const rootReducer = combineReducers({

    UserAuth  : createUserReducer, 
})


const middleware  = [thunk];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;