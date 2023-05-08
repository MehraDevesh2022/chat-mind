import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";
import "./app.css";
import ForgetPassowrd from "./component/user/ForgotPassword";
import SignupForm from "./component/user/Register";
import LoginForm from "./component/user/SignIn";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./action/userAction";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.UserData);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <Router>
        {!isAuthenticated && <HomePage />}
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
