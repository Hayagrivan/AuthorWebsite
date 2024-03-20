const jwt = require("jsonwebtoken");

// Middleware to check if user is authenticated
const authMiddleware = (req, res, next) => {
  // Get token from request headers or query parameters
  const token = req.headers.authorization?.split(" ")[1] || req.query.token;

  // Check if token exists
  if (!token) {
    // Return unauthorized access message if token is not provided
    return res.status(401).json({ message: "Unauthorized access" });
  }

  try {
    // Verify token using JWT library
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle token verification errors
    console.error("Error:", error);
    return res.status(401).json({ message: "Unauthorized access" });
  }
};

module.exports = authMiddleware;
