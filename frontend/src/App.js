import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatPage from "./Pages/ChatPage";


function App() {
  return (
    <>
      <Router>
          <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

      
          <Route exact path="/chat">
            <ChatPage/>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
