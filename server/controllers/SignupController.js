const User = require("../models/User");
const bcrypt = require("bcrypt");

// Controller function to create a new user
exports.createUser = async (req, res) => {
  // Destructuring user data from the request body
  const { username, email, password, name, age, gender, country, state, city } =
    req.body;

  try {
    // Check if the user already exists by username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password for security
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      console.error("Error hashing password:", hashError.message);
      return res.status(500).json({ error: "Error hashing password" });
    }

    // Create a new user instance with hashed password and other details
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: Date.now(),
      lastLoggedIn: Date.now(),
      isAdmin: false,
      name,
      age,
      gender,
      city,
      state,
      country,
      profilePicture: null,
    });

    // Save the new user to the database
    try {
      await newUser.save();
      console.log("User saved successfully:", newUser);
      res
        .status(201)
        .json({ message: "User created successfully", _id: newUser._id });
    } catch (saveError) {
      console.error("Error saving user to database:", saveError.message);
      res.status(500).json({ error: "Error saving user to database" });
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to check the availability of a username
exports.checkUsernameAvailability = async (req, res) => {
  const { username } = req.query;

  try {
    // Check if the username exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      // Username already exists
      return res.json({ available: false });
    } else {
      // Username is available
      return res.json({ available: true });
    }
  } catch (error) {
    console.error("Error checking username availability:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller function to check the existence of an email
exports.checkEmailExistence = async (req, res) => {
  const { email } = req.query;

  try {
    // Check if the email exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Email already exists
      return res.json({ exists: true });
    } else {
      // Email does not exist
      return res.json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email existence:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
