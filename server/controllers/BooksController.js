const Book = require("../models/Book");

// Controller function to get the latest book
exports.getLatestBook = async (req, res) => {
  try {
    // Log a message indicating the request to get the latest book
    console.log("Received a request to get the latest book");

    // Find the latest book using the Book model
    const latestBook = await Book.findOne({ isLatestBook: true });

    // If latest book is not found, return a 404 error response
    if (!latestBook) {
      return res.status(404).json({ message: "Latest book not found" });
    }

    // Log the details of the latest book
    console.log(JSON.stringify(latestBook));

    // Return a 200 OK response with the details of the latest book
    res.status(200).json(latestBook);
  } catch (error) {
    // If an error occurs during the process, return a 500 internal server error response
    res.status(500).json({ error: error.message });
  }
};

// Controller function to add a new book
exports.addBook = async (req, res) => {
  try {
    // Create a new book instance with the request body
    const book = new Book(req.body);

    // Log a message indicating the request details
    console.log("The Request is: " + book);

    // Save the new book to the database
    const savedBook = await book.save();

    // Return a 201 created response with the saved book details
    res.status(201).json(savedBook);
  } catch (error) {
    // If an error occurs during the process, return a 500 internal server error response
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all books
exports.getAllBooks = async (req, res) => {
  try {
    // Log a message indicating the request to retrieve all books
    console.log("Received a request to retrieve all the books");

    // Retrieve all books from the database
    const books = await Book.find();

    // Return a 200 OK response with the list of all books
    res.status(200).json(books);
  } catch (error) {
    // If an error occurs during the process, log the error and return a 500 internal server error response
    console.error("Error fetching books:", error);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a specific book by ID
exports.getBookById = async (req, res) => {
  try {
    // Find the book by ID using the Book model
    const book = await Book.findById(req.params.id);

    // If book is not found, return a 404 error response
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return a 200 OK response with the details of the specific book
    res.status(200).json(book);
  } catch (error) {
    // If an error occurs during the process, return a 500 internal server error response
    res.status(500).json({ error: error.message });
  }
};
