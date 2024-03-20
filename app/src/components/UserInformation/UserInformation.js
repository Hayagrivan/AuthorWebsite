import React from "react";
import "./UserInformation.css"; // Import styles for UserInformation component
import { FaEdit, FaSave } from "react-icons/fa"; // Import edit and save icons

const UserInformation = ({
  userInfo,
  editing,
  editedInfo,
  onEditClick,
  onSaveClick,
  onInputChange,
}) => {
  // Function to format date string
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  // Function to calculate time elapsed since a specific date
  const calculateTimeElapsed = (createdAt) => {
    const currentTime = new Date();
    const memberSince = new Date(createdAt);
    const elapsedMilliseconds = currentTime - memberSince;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30); // Approximation
    const elapsedYears = Math.floor(elapsedMonths / 12);

    return {
      years: elapsedYears,
      months: elapsedMonths % 12,
      days: elapsedDays % 30,
      hours: elapsedHours % 24,
      minutes: elapsedMinutes % 60,
      seconds: elapsedSeconds % 60,
    };
  };

  // Format user creation date
  const userSinceFormatted = formatDate(userInfo.createdAt);
  // Format last login date
  const lastLoggedInFormatted = formatDate(userInfo.lastLoggedIn);
  // Calculate time elapsed since user creation
  const timeElapsedUserSince = calculateTimeElapsed(userInfo.createdAt);
  // Calculate time elapsed since last login
  const timeElapsedLastLoggedIn = calculateTimeElapsed(userInfo.lastLoggedIn);

  return (
    <div className="user-info-container">
      {/* User engagement information */}
      <div className="user-engagement-info">
        {/* Display user engagement details */}
        <p>
          <strong>{userInfo.isAdmin ? "Admin" : "Member"} Since: </strong>{" "}
          {userSinceFormatted} (
          {timeElapsedUserSince.years > 0 &&
            `${timeElapsedUserSince.years} years, `}
          {timeElapsedUserSince.months > 0 &&
            `${timeElapsedUserSince.months} months, `}
          {timeElapsedUserSince.days > 0 &&
            `${timeElapsedUserSince.days} days, `}
          {timeElapsedUserSince.hours > 0 &&
            `${timeElapsedUserSince.hours} hours, `}
          {timeElapsedUserSince.minutes > 0 &&
            `${timeElapsedUserSince.minutes} minutes, `}
          {timeElapsedUserSince.seconds > 0 &&
            `${timeElapsedUserSince.seconds} seconds`}
          )
        </p>
        <p>
          <strong>Last Logged In: </strong> {lastLoggedInFormatted} (
          {timeElapsedLastLoggedIn.years > 0 &&
            `${timeElapsedLastLoggedIn.years} years, `}
          {timeElapsedLastLoggedIn.months > 0 &&
            `${timeElapsedLastLoggedIn.months} months, `}
          {timeElapsedLastLoggedIn.days > 0 &&
            `${timeElapsedLastLoggedIn.days} days, `}
          {timeElapsedLastLoggedIn.hours > 0 &&
            `${timeElapsedLastLoggedIn.hours} hours, `}
          {timeElapsedLastLoggedIn.minutes > 0 &&
            `${timeElapsedLastLoggedIn.minutes} minutes, `}
          {timeElapsedLastLoggedIn.seconds > 0 &&
            `${timeElapsedLastLoggedIn.seconds} seconds`}
          )
        </p>
      </div>

      {/* User personal information */}
      <div className="user-personal-info">
        {/* Personal information heading */}
        <div className="personal-information-heading-container">
          <h3>PERSONAL INFORMATION </h3>
          {/* Render edit or save button based on editing mode */}
          {editing ? (
            <button onClick={onSaveClick} className="edit-button">
              <FaSave className="edit-icon" /> Save
            </button>
          ) : (
            <button onClick={onEditClick} className="edit-button">
              <FaEdit className="edit-icon" /> Edit
            </button>
          )}
        </div>

        {/* Render input fields for personal details in editing mode, otherwise render text */}
        <p>
          <strong>Email: </strong>{" "}
          {editing ? (
            <input
              type="text"
              value={editedInfo.email || ""}
              onChange={(e) => onInputChange(e, "email")}
            />
          ) : (
            userInfo.email || "Not Available"
          )}
        </p>
        <p>
          <strong>Age: </strong>{" "}
          {editing ? (
            <input
              type="number"
              value={editedInfo.age || ""}
              onChange={(e) => onInputChange(e, "age")}
            />
          ) : (
            userInfo.age || "Not Available"
          )}
        </p>
        <p>
          <strong>Gender: </strong>{" "}
          {editing ? (
            <input
              type="select"
              value={editedInfo.gender || ""}
              onChange={(e) => onInputChange(e, "gender")}
            />
          ) : (
            userInfo.gender || "Not Available"
          )}
        </p>
        <p>
          <strong>City: </strong>{" "}
          {editing ? (
            <input
              type="text"
              value={editedInfo.city || ""}
              onChange={(e) => onInputChange(e, "city")}
            />
          ) : (
            userInfo.city || "Not Available"
          )}
        </p>
        <p>
          <strong>State: </strong>{" "}
          {editing ? (
            <input
              type="text"
              value={editedInfo.state || ""}
              onChange={(e) => onInputChange(e, "state")}
            />
          ) : (
            userInfo.state || "Not Available"
          )}
        </p>
        <p>
          <strong>Country: </strong>{" "}
          {editing ? (
            <input
              type="text"
              value={editedInfo.country || ""}
              onChange={(e) => onInputChange(e, "country")}
            />
          ) : (
            userInfo.country || "Not Available"
          )}
        </p>
      </div>
    </div>
  );
};

export default UserInformation;
