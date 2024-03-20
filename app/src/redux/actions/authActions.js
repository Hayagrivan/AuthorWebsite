/**
 * Action creator function for indicating successful login.
 * @param {string} userId - The user ID.
 * @param {boolean} isAdmin - Indicates whether the user is an admin or not.
 * @param {boolean} isLoggedIn - Indicates whether the user is logged in or not.
 * @returns {Object} An action object with type "LOGIN_SUCCESS" and payload containing user information.
 */
export const loginSuccess = (userId, isAdmin, isLoggedIn) => {
  return {
    type: "LOGIN_SUCCESS", // Action type indicating successful login
    payload: { userId, isAdmin, isLoggedIn }, // Payload containing user information
  };
};

/**
 * Action creator function for indicating successful logout.
 * @returns {Object} An action object with type "LOGOUT_SUCCESS".
 */
export const logoutSuccess = () => {
  return {
    type: "LOGOUT_SUCCESS", // Action type indicating successful logout
  };
};
