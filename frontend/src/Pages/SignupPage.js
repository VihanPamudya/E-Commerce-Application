import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../Components/InputField";
import "../Styles/LoginScreen.css";
import SignupImage from "../Images/signup.png";
import { Input } from "@chakra-ui/react";

const SignUpPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      userName: userName,
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        setUserName("");
        setEmail("");
        setPassword("");

        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred during signup. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <InputField
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <InputField
              label="Email"
              type="email"
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
              Sign Up
            </button>
          </form>

          <p className="signup-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>

        <div className="illustration-section">
          <img
            src={SignupImage}
            alt="Illustration"
            className="illustration-image"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
