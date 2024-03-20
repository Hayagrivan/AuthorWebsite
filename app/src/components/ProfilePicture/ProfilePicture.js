import React from "react";
import "./ProfilePicture.css";
import defaultProfilePicture from "../../assets/images/defaultProfile.svg";

const ProfilePicture = ({ profilePicture, onProfilePictureChange }) => {
  // Function to handle click on default profile picture
  const handleDefaultPictureClick = () => {
    document.getElementById("fileInput").click(); // Trigger file input click
  };

  return (
    <div className="profile-picture-container">
      {/* Container for profile picture */}
      <div className="picture-wrapper" onClick={handleDefaultPictureClick}>
        {/* Conditionally render profile picture or default profile picture */}
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <>
            <img
              src={defaultProfilePicture}
              alt="Default"
              className="default-profile-picture"
            />
            <div className="upload-text">Click to Upload</div>
          </>
        )}
      </div>
      {/* Input element for uploading profile picture */}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={onProfilePictureChange}
        style={{ display: "none" }} // Hide the input element
      />
    </div>
  );
};

export default ProfilePicture;
