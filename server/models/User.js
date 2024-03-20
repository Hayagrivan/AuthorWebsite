const mongoose = require("mongoose");
// const bcrypt = require("bcrypt"); // bcrypt library for password hashing

// Define the schema for the user model
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true, // Ensure username uniqueness
    required: true,
  },
  email: {
    type: String,
    unique: true, // Ensure email uniqueness
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default creation date to current date/time
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now, // Default last login date to current date/time
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default user role to regular user
  },
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  profilePicture: {
    type: Buffer,
  },
});

// Middleware to hash password before saving user (commented out for now)
// UserSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
//   next();
// });

// Create the User model using the schema
const User = mongoose.model("User", UserSchema);

module.exports = User;
