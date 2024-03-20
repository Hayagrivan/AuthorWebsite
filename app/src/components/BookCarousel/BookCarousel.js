import React, { useState, useEffect } from "react";
import "./BookCarousel.css";

const BookCarousel = () => {
  // State to store the list of books and error
  const [books, setBooks] = useState([]); // State for storing books fetched from API
  const [error, setError] = useState(null); // State for storing fetch error if any

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await fetch("/api/books/all-books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Throw an error if response is not OK
        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        // Parse response data
        const data = await response.json();
        // Update the books state with fetched data
        setBooks(data);
      } catch (error) {
        // Handle fetch errors
        console.error("Error fetching books:", error);
        // Set the error state
        setError("Failed to fetch books. Please try again later.");
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Function to convert buffer to data URL
  const convertBufferToDataURL = (buffer) => {
    if (buffer && buffer.data) {
      const base64String = btoa(
        new Uint8Array(buffer.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64String}`;
    }
    return ""; // Return an empty string if buffer is not available
  };

  // Render the BookCarousel component
  return (
    <div className="book-carousel-container">
      <div className="book-carousel">
        {books.map((book, index) => (
          <div key={index} className="book-item">
            <img
              src={convertBufferToDataURL(book.frontCover.uploadedImage)}
              alt={book.title}
            />
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the BookCarousel component
export default BookCarousel;
