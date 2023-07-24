import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Loader from "./components/layouts/Loader";
 import { useHistory } from "react-router-dom";
const Chatpage = React.lazy(() => import("./Pages/Chatpage"));
const Signup = React.lazy(() => import("./components/Authentication/Signup"));
const Login = React.lazy(() => import("./components/Authentication/Login"));
const ForgetPassowrd = React.lazy(() =>
  import("./components/Authentication/ForgotPassword")
);

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
         <React.Suspense fallback={<Loader/>}>
           <Switch>
             <Route exact path="/signup" component={Signup} />
             <Route exact path="/" component={Login} />
             <Route exact path="/forgot/password" component={ForgetPassowrd} />
             <Route exact path="/chats" component={Chatpage} />
           </Switch>
         </React.Suspense>
       </Router>
     </div>
   );
}

export default App;
