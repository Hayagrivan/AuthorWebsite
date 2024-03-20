const express = require("express");
const router = express.Router();
const bookController = require("../../controllers/BooksController");

//----------------- Public Routes ----------------------------
// Route to add a book
router.post("/books/add-book", bookController.addBook);

// Route to get all books
router.get("/books/all-books", bookController.getAllBooks);

// Route to get the latest book
router.get("/books/latestbook", bookController.getLatestBook);

// Route to get a specific book by ID
router.get("/books/:id", bookController.getBookById);

module.exports = router;
