const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT expiration time (24 hours in seconds)
const jwtExpireTime = 24 * 60 * 60;

// Controller function to authenticate and login a user
exports.loginUser = async (req, res) => {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // If user does not exist, return 400 (Bad Request) with an error message
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If password is not valid, return 401 (Unauthorized) with an error message
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    let token;
    try {
      token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: jwtExpireTime, // Token expires in jwtExpireTime seconds (24 hours)
        }
      );
    } catch (jwtError) {
      console.error("JWT Error:", jwtError);
      return res.status(500).json({ message: "Error signing JWT token" });
    }

    // Update last logged-in time
    user.lastLoggedIn = new Date();
    await user.save();
    console.log("User is an admin? ", user.isAdmin);

    // Authentication successful, return 200 (OK) with token and user details
    res.status(200).json({
      message: "User logged in successfully",
      token,
      id: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    // If an error occurs during the process, log the error and return 500 (Internal Server Error)
    console.error("Error:", error);
    res.status(500).json({ message: "An error occurred. Please try again" });
  }
};
