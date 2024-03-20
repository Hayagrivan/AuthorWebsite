const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/LoginController");
const signupController = require("../../controllers/SignupController");

// Authentication Routes

// Route to handle user login
router.post("/login", loginController.loginUser);

// Route to handle user signup
router.post("/signup", signupController.createUser);

// Route to check the availability of a username
router.get("/check-username", signupController.checkUsernameAvailability);

// Route to check the existence of an email
router.get("/check-email", signupController.checkEmailExistence);

module.exports = router;
