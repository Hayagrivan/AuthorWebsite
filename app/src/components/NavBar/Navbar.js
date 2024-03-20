import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/actions/authActions"; // Import the logout action
import "./Navbar.css";

// NavBar component for navigation links
const NavBar = ({ isLoggedIn, isAdmin, userId }) => {
  const dispatch = useDispatch();

  // Function to handle logout
  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logoutSuccess());
    // Remove the token from localStorage (if needed)
    localStorage.removeItem("token");
    // Redirect to the home page or perform any other necessary action after logout
    window.location.replace("/");
  };
  return (
    // Navigation container
    <nav className="navbar">
      {isLoggedIn ? (
        <>
          {/* NavLink for the "About Me" page */}
          <NavLink
            to={
              isLoggedIn && !isAdmin
                ? `/member/${userId}/about`
                : `/admin/${userId}/about`
            }
            className="active-link"
          >
            About Me
          </NavLink>
          {/* NavLink for the "Books" page */}
          <NavLink
            to={
              isLoggedIn && !isAdmin
                ? `/member/${userId}/books`
                : `/admin/${userId}/books`
            }
            className="active-link"
          >
            Books
          </NavLink>
        </>
      ) : (
        <>
          {/* NavLink for the "About Me" page */}
          <NavLink to="/about" className="active-link">
            About Me
          </NavLink>
          {/* NavLink for the "Books" page */}
          <NavLink to="/books" className="active-link">
            Books
          </NavLink>
        </>
      )}

      {/* Conditional rendering based on login status */}
      {isLoggedIn ? (
        <>
          {/* NavLink for the "My Profile" page */}
          {isAdmin ? (
            <NavLink to={`/admin/${userId}/profile`} className="active-link">
              My Profile
            </NavLink>
          ) : (
            <NavLink to={`/member/${userId}/profile`} className="active-link">
              My Profile
            </NavLink>
          )}
          {/* Logout button */}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          {/* Signup link */}
          <NavLink to="/signup" className="active-link">
            Signup
          </NavLink>
          {/* NavLink for the "Login" page */}
          <NavLink to="/login" className="login-button">
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
