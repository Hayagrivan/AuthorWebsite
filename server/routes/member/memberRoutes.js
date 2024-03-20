const express = require("express");
const router = express.Router();
const memberController = require("../../controllers/MemberController");
const logoutController = require("../../controllers/LogoutController");
const bookController = require("../../controllers/BooksController");
const authMiddleware = require("../../middleware/authMiddleware");

// Get Specific Book by ID
router.get("/:id/books/:id", bookController.getBookById);

// Get All Books
router.get("/:id/books/all-books", bookController.getAllBooks);

// Get latest book
router.get("/:id/books/latestbook", bookController.getLatestBook);

// Apply authMiddleware to member routes
router.use(authMiddleware);

// ---------------------------- Member Routes -------------------------------

// Get the member profile
router.get("/:id/profile", memberController.getMemberById);

// Logout the member
router.post("/:id/logout", logoutController.logoutUser);

module.exports = router;
