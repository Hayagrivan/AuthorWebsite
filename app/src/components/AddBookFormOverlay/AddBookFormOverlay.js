import React from "react";
import AddBookForm from "../AddBookForm/AddBookForm";
import "./AddBookFormOverlay.css";

// Define the AddBookFormOverlay functional component
const AddBookFormOverlay = ({ isVisible, onClose, onImageUpload }) => {
  return (
    // Container for the book form overlay with dynamic visibility class
    <div className={`bookFormOverlayContainer ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        // Render BookForm component with necessary props
        <AddBookForm onClose={onClose} onImageUpload={onImageUpload} />
      )}
    </div>
  );
};

// Export the AddBookFormOverlay component
export default AddBookFormOverlay;
