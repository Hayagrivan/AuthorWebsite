const User = require("../models/User");

// Controller function to retrieve specific member details by ID
exports.getMemberById = async (req, res) => {
  try {
    // Log the receipt of a request to retrieve the member by ID
    console.log("Received a request to retrieve the member by ID");

    // Find the member by ID
    const member = await User.findById(req.params.id);

    // If member is not found, respond with 404 (Not Found) status and an error message
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Respond with 200 (OK) status and the member details
    res.status(200).json(member);
  } catch (error) {
    // If an error occurs during the process, respond with 500 (Internal Server Error) status and the error message
    res.status(500).json({ error: error.message });
  }
};
