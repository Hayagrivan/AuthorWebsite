import React, { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onSuccess }) => {
  const [username, setUsername] = useState(""); // State for username input
  const [password, setPassword] = useState(""); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loginError, setLoginError] = useState(null); // State to track login errors

  // Handler for username input change
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Handler for password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handler for toggling password visibility
  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  // Handler for form submission (login)
  const handleLogin = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    // Send the username and password securely to your server
    try {
      const response = await fetch("/api/authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(data.id, data.isAdmin, true); // Call onSuccess callback with user data
        // Store token in localStorage
        localStorage.setItem("token", data.token);
      } else {
        // Authentication failed
        setLoginError("Invalid username or password"); // Set login error message
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred. Please try again."); // Set generic error message
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Login</h1>
      <div className="loginForm-input-container">
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          id="login-username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>
      <div className="loginForm-input-container">
        <label htmlFor="login-password">Password:</label>
        <div className="password-input-wrapper">
          <input
            type={showPassword ? "text" : "password"} /* Toggle input type */
            id="login-password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span
            className="password-toggle-icon"
            onClick={handlePasswordVisibilityToggle}
          >
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
      </div>
      <div className="loginForm-input-container">
        <input type="submit" value="Login" />
      </div>
      {loginError && <p className="error-message">{loginError}</p>}{" "}
      {/* Display login error message if any */}
      <p>
        New user?{" "}
        <a href="/signup" className="signup-link">
          Sign up here
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
