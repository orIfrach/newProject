import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios"; 

const LoginForm = ({ }) => {

  const [popupStyle, setPopupStyle] = useState("hide");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  //function to show the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //function that displays a popup message
  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupStyle("login-popup");
    setTimeout(() => hidePopup(), 3000);
  };

  const hidePopup = () => {
    setPopupStyle("hide");
    setPopupMessage("");
  };

  const handleLogin = async () => {
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;

    // Send the login data to the backend for authentication

    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.data.success) {
        showPopup("Login successful");
        setLoggedInUser(email);
        localStorage.setItem('loggedInUser', JSON.stringify(email));
        // Delay the navigation after showing the popup
        setTimeout(() => {
        navigate('/');
      }, 3300);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showPopup("email or password are incorrect");
    }
  };

  //login form
  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Enter email" />
      <input
        type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter Password"/>
      <div className="chk-box">
        <input type="checkbox" id="chk" checked={showPassword} onChange={toggleShowPassword}/>
        Show Password
      </div>
      <div className="buttons" onClick={handleLogin}>
        Sign in
      </div>
      <div className="login-text">
      </div>
      <p>
          Need to create an account? <Link to="/SignupForm">Sign Up</Link>
        </p>
      <div className={popupStyle}>
        <h3>Login Status</h3>
        <p>{popupMessage}</p>
      </div>
    </div>
  );
};

export default LoginForm;
