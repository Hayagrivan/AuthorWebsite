/**
 * Initial state for the authentication reducer.
 */
const initialState = {
  isLoggedIn: false, // Indicates whether the user is logged in or not
  isAdmin: false, // Indicates whether the user is an admin or not
  userId: null, // The ID of the logged-in user
};

/**
 * Reducer function for managing authentication-related state.
 * @param {Object} state - Current state, defaults to initialState.
 * @param {Object} action - Action object containing information about the action dispatched.
 * @returns {Object} New state after applying the action.
 */
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      // Update state with user information upon successful login
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        isAdmin: action.payload.isAdmin,
        userId: action.payload.userId,
      };
    case "LOGOUT_SUCCESS":
      // Reset state to initial state upon successful logout
      return initialState;
    default:
      // Return current state for unrecognized actions
      return state;
  }
};

export default authReducer;
