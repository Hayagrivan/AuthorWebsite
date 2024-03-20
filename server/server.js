require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

// Import routes
const authenticationRoutes = require("./routes/auth/authenticationRoutes");
const publicRoutes = require("./routes/public/publicRoutes");
const memberRoutes = require("./routes/member/memberRoutes");
const adminRoutes = require("./routes/admin/adminRoutes");

// Establish connection to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Connected to database...");
    },
    (err) => {
      console.log("Error connecting to database: " + err);
    }
  );

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Passport middleware
app.use(passport.initialize());

// Parse incoming requests with bodyParser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use CORS middleware to enable cross-origin requests
app.use(cors());

// Serve static assets from the static assets folder
app.use(express.static(path.join(__dirname, "public")));

// Serve the React app on the root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Define routes for authentication, member, admin, and public access
app.use("/api/authentication", authenticationRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", publicRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
