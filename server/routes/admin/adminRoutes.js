const express = require("express");
const router = express.Router();
const logoutController = require("../../controllers/LogoutController");
const authMiddleware = require("../../middleware/authMiddleware");

// Apply authMiddleware to member routes
router.use(authMiddleware);

// ---------------------------Admin Routes--------------------------------

// Route to add a book as an admin
router.post("/:id/books/add", (req, res) => {
  res.json({ message: "You are trying to add a book as an admin" });
});

// Route to update a specific book as an admin
router.put("/:id/books/:id/update", (req, res) => {
  let id = req.params.id;
  res.json({ message: `You are trying to update the book ${id} as an admin` });
});

// Route to logout the admin
router.post("/:id/logout", logoutController.logoutUser);

module.exports = router;
