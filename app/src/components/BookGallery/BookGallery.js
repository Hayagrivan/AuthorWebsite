import React, { useEffect, useState } from "react";
import { Card, CardGroup, Button } from "react-bootstrap";
import { Book } from "react-bootstrap-icons";
import AddBookFormOverlay from "../AddBookFormOverlay/AddBookFormOverlay";
import { useSelector } from "react-redux"; // Import useSelector hook
import "./BookGallery.css";

const BookGallery = () => {
  // Access Redux state
  const { isLoggedIn, isAdmin, userId } = useSelector((state) => state.auth);

  console.log(`The user is: ${userId}`);
  console.log("Is the user logged in:", isLoggedIn);
  console.log("Is the user admin:", isAdmin);

  // State variables
  const [books, setBooks] = useState([]);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Fetch books from the server on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let apiUrl;
        const token = localStorage.getItem("token");
        console.log("The isLogged is:", isLoggedIn);
        console.log("The isAdmin is", isAdmin);
        console.log("The token is: ", token);

        if (isLoggedIn && isAdmin) {
          apiUrl = `/api/admin/${userId}/books/all-books`;
        } else if (isLoggedIn && !isAdmin) {
          apiUrl = `/api/member/${userId}/books/all-books`;
        } else {
          apiUrl = "/api/books/all-books";
        }

        console.log("API URL:", apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("The response from the server is: ", response);

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error.message);
      }
    };

    fetchBooks();
  }, [isLoggedIn, isAdmin, userId]);

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
    return ""; // Return an empty string if buffer or uploadedImage is not available
  };

  // Placeholder function for handling image upload
  const handleImageUpload = (image) => {
    console.log("Image uploaded:", image);
  };

  // Open book form overlay
  const openBookFormWindow = () => {
    setOverlayVisible(true);
  };

  // Close book form overlay
  const closeBookFormWindow = () => {
    setOverlayVisible(false);
  };

  return (
    <div className="bookGalleryContainer">
      {/* Render "Add Book" button only if user is admin */}
      {isLoggedIn && isAdmin && (
        <Button
          variant="primary"
          className="addButton"
          onClick={openBookFormWindow}
        >
          <Book /> Add New Book
        </Button>
      )}

      <div className="container">
        {/* Display book cards when data is available */}
        <CardGroup className="cardGroup">
          {books.map((book) => (
            <Card key={book._id} className="card">
              {/* Display book cover image */}
              {book.frontCover && book.frontCover.uploadedImage && (
                <>
                  <Card.Img
                    variant="top"
                    src={convertBufferToDataURL(book.frontCover.uploadedImage)}
                    alt={book.title}
                  />
                  {/* Overlay for edit and delete icons */}
                  <div className="cardOverlay">
                    <div className="cardText">
                      {/* Display book title */}
                      <Card.Title className="cardTitleCustom">
                        {book.title}
                      </Card.Title>
                      {/* Explore link */}
                      <div
                        className="exploreText"
                        onClick={() => {
                          console.log("Clicked on explore link");
                          console.log(`The user is: ${userId}`);
                          console.log("Is the user logged in:", isLoggedIn);
                          console.log("Is the user admin:", isAdmin);
                          const urlPrefix =
                            isLoggedIn && isAdmin
                              ? `/admin/${userId}`
                              : isLoggedIn
                              ? `/member/${userId}`
                              : "";
                          console.log("Url prefix is: ", urlPrefix);
                          window.location.href = `${urlPrefix}/books/${book._id}`;
                        }}
                      >
                        Explore
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Card>
          ))}
        </CardGroup>
      </div>

      {isOverlayVisible && (
        <AddBookFormOverlay
          isVisible={isOverlayVisible}
          onClose={closeBookFormWindow}
          onImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default BookGallery;
