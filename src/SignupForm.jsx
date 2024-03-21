import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./SignupForm.css";
import axios from "axios"; 

const SignupForm = () => {
  const [popupStyle, setPopupStyle] = useState("hide");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //function to show the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: ""
})

  //regex for email check
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //function that displays a popup message
  const showPopup = (message) => {
    setPopupMessage(message);
    setPopupStyle("signup-popup");
    setTimeout(() => hidePopup(), 3000);
  };

  const hidePopup = () => {
    setPopupStyle("hide");
    setPopupMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  const handleSignup = async () => {
    const email = document.querySelector('[name="email"]').value;
    const password = document.querySelector('[name="password"]').value;

    try {
      // Check if email already exists
      const checkUserResponse = await axios.get(`/api/check-user? email=${email}`);
      if (checkUserResponse.data.exists) {
        showPopup("email already exists");
        return;
      }
      //email check
      if(!isValidEmail(formData.email)){
        showPopup("emaill is incorrect");
        return;
      }
      //password check
      if(formData.password.length < 4){
        showPopup("password must be higher then 4 digits")
        return
      }

  
      // If email not exists AND the details are ok, continue
      await axios.post("/api/signup", { email, password });
      showPopup("User registered successfully");
      setTimeout(() => {
        navigate('/LoginForm');
      }, 3300);
      
      // Clear input after successful registration
      document.querySelector('[name="email"]').value = "";
      document.querySelector('[name="password"]').value = "";
    } catch (error) {
      console.error("Error during user registration:", error);
      showPopup("User registration failed");
    }
  };

//signup form
  return (
    <div className="signup-cover">
      <h1>Signup</h1>
      <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleInputChange} />
      <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter Password"value={formData.password} onChange={handleInputChange} />
      <div className="signup-chkbox">
        <input type="checkbox" id="chk" checked={showPassword} onChange={toggleShowPassword}/>
        Show Password
      </div>
      <div className="buttons" onClick={handleSignup}>
        Sign up
      </div>
      <div className="signup-text">
        <p>
          Already have an account? <Link to="/LoginForm">Login</Link>
        </p>
      </div>

      <div className={popupStyle}>
        <h3>Registration Status</h3>
        <p>{popupMessage}</p>
      </div>
    </div>
  );
};

export default SignupForm;