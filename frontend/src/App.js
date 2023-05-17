import "./App.css";
import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import { useHistory } from "react-router";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import ForgetPassowrd from "./components/Authentication/ForgotPassword";

function App() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
 

    if (!user) history.push("/");
    else history.push("/chats");
  }, [history, user]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            {" "}
            <Login />
          </Route>

          <Route exact path="/forgot/password">
            {" "}
            <ForgetPassowrd />
          </Route>

          <Route exact path="/chats">
            <Chatpage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
