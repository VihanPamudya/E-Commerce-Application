import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import "../Styles/LoginScreen.css";
import LoginImage from "../Images/login.png";

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        setEmail("");
        setPassword("");
        onLogin(token);

        navigate("/dashboard");
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={
                <span
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              }
            />
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>

        <div className="illustration-section">
          <img
            src={LoginImage}
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
