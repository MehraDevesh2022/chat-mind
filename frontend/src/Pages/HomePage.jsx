import React from "react";
import { useLocation } from "react-router-dom";
import SignupForm from "../component/user/Register";
import LoginForm from "../component/user/SignIn";
import './Home.css'
function HomePage() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">ChatMind</div>
          <div className="navbar-menu">
            <div className="navbar-item">
              {location.pathname !== "/login"
                ? "Ready to ChatMind? Let's Login"
                : "Join the ChatMind community !"}
            </div>
          </div>
        </div>
      </nav>
      <div className="home_page">
        <div className="Home_container">
          {location.pathname !== "/login" ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </>
  );
}

export default HomePage;
