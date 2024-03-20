import React from "react";
import { connect } from "react-redux";
import BookGallery from "../../components/BookGallery/BookGallery";

// Books component
const Books = ({ isLoggedIn, isAdmin, userId }) => {
  // Render the BookGallery component
  return <BookGallery />;
};

// Map state to props to access authentication information from Redux store
const mapStateToProps = (state) => ({
  userId: state.auth.userId, // User ID from Redux store
  isAdmin: state.auth.isAdmin, // Admin status from Redux store
  isLoggedIn: state.auth.isLoggedIn, // Logged-in status from Redux store
});

// Connect the Books component to the Redux store
export default connect(mapStateToProps)(Books);
