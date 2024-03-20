import React, { useState, useEffect } from "react";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import UserInformation from "../../components/UserInformation/UserInformation";
import { useParams } from "react-router-dom";
import Banner from "../../components/Banner/Banner";
import "./profilepage.css";

const Profile = () => {
  // Retrieve the user ID from the URL parameters
  const { id } = useParams();
  // State to store user information
  const [userInfo, setUserInfo] = useState(null);
  // State to track loading status
  const [loading, setLoading] = useState(true);

  // Fetch user data from the backend upon component mounting or ID change
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (id) {
          // Retrieve the token from local storage
          const token = localStorage.getItem("token");
          // Fetch user profile data from the backend
          const response = await fetch(`/api/member/${id}/profile`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          });
          // Handle non-successful responses
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          // Parse the JSON response
          const data = await response.json();
          // Update the user information in state
          setUserInfo(data);
          // Set loading state to false once data is fetched
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, [id]); // Dependency array to re-run effect when ID changes

  return (
    <div className="profile-container">
      {/* Render the banner component */}
      <Banner />
      {/* Render the profile picture component */}
      <div className="ProfilePicture">
        <ProfilePicture />
      </div>
      {/* Conditional rendering based on loading state */}
      {loading ? (
        // Render a loading indicator while data is being fetched
        <p>Loading...</p>
      ) : (
        // Render user information once data is fetched
        <div className="UserInformation">
          {/* Display user name */}
          <h1>{userInfo.name}</h1>
          {/* Display user role (admin or member) */}
          <h2>{userInfo.isAdmin ? "Admin" : "Member"}</h2>
          {/* Render additional user information */}
          <UserInformation userInfo={userInfo} />
        </div>
      )}
    </div>
  );
};

export default Profile;
