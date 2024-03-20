const User = require("../models/User");

// Controller function to logout a user
exports.logoutUser = (req, res) => {
  try {
    // Remove the JWT token from local storage
    localStorage.removeItem("token");

    // Respond with 200 (OK) and a success message
    res.status(200).json({ message: "Logout successful" });

    // Redirect the user to the home page
    res.redirect("/home");
  } catch (error) {
    // If an error occurs during the process, log the error and return 500 (Internal Server Error)
    console.error("Error logging out:", error.message);
    res.status(500).json({ error: "An error occurred while logging out" });
  }
};
