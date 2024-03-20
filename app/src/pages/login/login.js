import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/actions/authActions.js";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm.js";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [userId, setUserId] = useState(null); // State to store the user ID
  const [isAdmin, setIsAdmin] = useState(false); // State to track user role

  // Callback function triggered upon successful login
  const handleLoginSuccess = (userId, isAdmin, isLoggedIn) => {
    // Dispatch login success action with user data
    dispatch(loginSuccess(userId, isAdmin, isLoggedIn));
    // Update local state with user data
    setUserId(userId); // Update the user ID in state
    setIsAdmin(isAdmin); // Update isAdmin in state
    setLoggedIn(true); // Set loggedIn state to true
  };

  // Log state values for debugging
  console.log("The state of isAdmin is:", isAdmin);
  console.log("The state of isLoggedIn is:", loggedIn);
  console.log("The state of userId is:", userId);

  // Redirect to profile page upon successful login
  if (loggedIn) {
    // Determine the navigation path based on isAdmin state
    const profilePath = isAdmin
      ? `/admin/${userId}/profile`
      : `/member/${userId}/profile`;
    return <Navigate to={profilePath} />; // Redirect to the profile page
  }

  // Render the login form if not logged in
  return (
    <main className="login">
      <div className="login-container">
        <LoginForm onSuccess={handleLoginSuccess} /> {/* Render login form */}
      </div>
    </main>
  );
};

export default Login;
