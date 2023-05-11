import React  ,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {loadUser , clearError} from "./action/userAction";
import {useDispatch , useSelector } from "react-redux";
import ChatPage from "./Pages/ChatPage";
import "./app.css";
import ForgetPassowrd from "./component/user/ForgotPassword";
import SignupForm from "./component/user/Register";
import LoginForm from "./component/user/SignIn";
import { useHistory } from "react-router-dom";
function App() {

  const dispatch = useDispatch();
  const history = useHistory();
  const { error , loading, isAuthenticated  } = useSelector((state) => state.UserData);
   
  
  useEffect(() => {
    if (error) {
      dispatch(clearError()); 
    }
    if (!loading && !isAuthenticated) {
      history.push("/login");
    }
    dispatch(loadUser());

    }, [dispatch, error, history, isAuthenticated, loading])
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <SignupForm />
          </Route>
          <Route exact path="/login">
            <LoginForm />
          </Route>
          <Route exact path="/forgot/password">
            <ForgetPassowrd />
          </Route>
          <Route exact path="/chat">
            <ChatPage />
          </Route>
        </Switch>
      
      </Router>
    </>
  );
}

export default App;
