import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from "../NavBar/Navbar";
import logoImage from "../../assets/images/MKSlogo.jpeg";
import "./Header.css";

// Header component containing logo and navigation bar
const Header = ({ isLoggedIn, isAdmin, userId }) => {
  return (
    <header className="header">
      {/* Link to the home page */}
      <Link to="/" className="logo-link">
        {/* Logo and site name */}
        <div className="logo-container">
          {/* Logo image */}
          <img src={logoImage} alt="Logo" />
          {/* Site name */}
          <span>MK Sudarshan</span>
        </div>
      </Link>

      {/* Navigation bar component */}
      <NavBar isLoggedIn={isLoggedIn} isAdmin={isAdmin} userId={userId} />
    </header>
  );
};

// Map Redux state to component props
const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  userId: state.auth.userId,
});

export default connect(mapStateToProps)(Header);
