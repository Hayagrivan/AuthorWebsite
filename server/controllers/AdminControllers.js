const User = require("../models/User");

// Controller function to get specific admin details by ID
exports.getAdminById = async (req, res) => {
  try {
    // Log a message indicating the request to retrieve admin by ID
    console.log("Received a request to retrieve the admin by ID");

    // Find the admin by ID using the User model
    const admin = await User.findById(req.params.id);

    // If admin is not found, return a 404 error response
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // If admin is found, return a 200 OK response with admin details
    res.status(200).json(admin);
  } catch (error) {
    // If an error occurs during the process, return a 500 internal server error response
    res.status(500).json({ error: error.message });
  }
};
