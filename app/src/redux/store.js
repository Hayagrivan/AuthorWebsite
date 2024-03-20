import { configureStore } from "@reduxjs/toolkit"; // Importing configureStore from Redux Toolkit
import authReducer from "./reducers/authReducer"; // Importing the authentication reducer

// Creating the Redux store using configureStore
const store = configureStore({
  reducer: {
    auth: authReducer, // Using authReducer to manage authentication-related state under the 'auth' slice
  },
});

export default store; // Exporting the Redux store
