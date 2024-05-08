import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";

const LoginForm = ({ setLoggedInUser }) => {
  const [popupStyle, setPopupStyle] = useState("hide");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false); // State to manage OTP modal
  const [otp, setOTP] = useState(""); // State to hold OTP
  const [email, setEmail] = useState(""); // State to hold email
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
    const inputEmail = document.querySelector('[name="email"]').value;
    setEmail(inputEmail);

    try {
      // Send request to backend to send OTP
      const otpResponse = await axios.post("/api/send-otp", { email: inputEmail });
      
      // OTP sent successfully
      if (otpResponse.status === 200) {
        // Prompt user to enter OTP by opening the OTP modal
        setOtpModalOpen(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      showPopup("Failed to send OTP or login");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      // Send request to backend to verify OTP
      const otpVerificationResponse = await axios.post("/api/login", {
        email,
        password: document.querySelector('[name="password"]').value,
        otp
      });

      if (otpVerificationResponse.data.success) {
        // Close OTP modal
        setOtpModalOpen(false);

        // Proceed with login
        showPopup("Login successful");
        setLoggedInUser(email);
        localStorage.setItem("loggedInUser", JSON.stringify(email));
        setTimeout(() => {
          navigate("/");
        }, 3300);
      } else {
        showPopup("Email, password, or OTP is incorrect");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      showPopup("Failed to verify OTP");
    }
  };

  return (
    <div className="login-cover">
      <h1>Login</h1>
      <input type="text" name="email" placeholder="Enter email" />
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter Password"
      />
      <div className="chk-box">
        <input
          type="checkbox"
          id="chk"
          checked={showPassword}
          onChange={toggleShowPassword}
        />
        Show Password
      </div>
      <div className="buttons" onClick={handleLogin}>
        Sign in
      </div>
      <div className="login-text"></div>
      <p>
        Need to create an account? <Link to="/SignupForm">Sign Up</Link>
      </p>
      <div className={popupStyle}>
        <h3>Login Status</h3>
        <p>{popupMessage}</p>
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <div className="otp-modal">
          <h2>Enter OTP</h2>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
          />
          <div className="otp-buttons">
            <div className="otp-confirm" onClick={handleVerifyOTP}>
              Confirm
            </div>
            <div className="otp-cancel" onClick={() => setOtpModalOpen(false)}>
              Cancel
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
