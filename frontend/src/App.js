import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ChatPage from "./Pages/ChatPage";
import "./app.css";
import ForgetPassowrd from "./component/user/ForgotPassword";
import SignupForm from "./component/user/Register";
import LoginForm from "./component/user/SignIn";

function App() {

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
