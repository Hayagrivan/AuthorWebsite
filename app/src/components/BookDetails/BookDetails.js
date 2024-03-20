import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./BookDetails.css";

const BookDetails = ({ userId, isAdmin, isLoggedIn }) => {
  // Get the book ID from the URL params
  const { id } = useParams();

  // State variables for book details and cover display toggle
  const [bookDetails, setBookDetails] = useState(null);
  const [displayFrontCover, setDisplayFrontCover] = useState(true);

  // Effect to fetch book details when the ID changes
  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          let apiUrl;

          // Construct API URL based on user role and login status
          if (isLoggedIn && isAdmin) {
            apiUrl = `/api/admin/${userId}/books/${id}`;
          } else if (isLoggedIn && !isAdmin) {
            apiUrl = `/api/member/${userId}/books/${id}`;
          } else {
            apiUrl = `/api/books/${id}`;
          }

          // Fetch book details from the API
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error("Failed to fetch book");
          }
          const data = await response.json();
          console.log("API Response:", data);
          setBookDetails(data);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBook();
  }, [id, userId, isAdmin, isLoggedIn]); // Dependency on book ID to trigger fetch

  // Function to convert buffer to data URL for images
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
    return "";
  };

  // Function to toggle between front and back covers
  const toggleCover = () => {
    setDisplayFrontCover((prev) => !prev);
  };

  return (
    <div className="bookPageContainer">
      {bookDetails ? (
        <>
          <div className="bookDetails">
            <div className="bookDetails-cover-container">
              <img
                src={convertBufferToDataURL(
                  displayFrontCover
                    ? bookDetails.frontCover.uploadedImage
                    : bookDetails.backCover.uploadedImage
                )}
                alt={displayFrontCover ? "Front Cover" : "Back Cover"}
                className="bookDetails-cover"
              />
              <div className="toggleButtonContainer">
                <Button onClick={toggleCover} className="toggleButton">
                  {displayFrontCover ? "Show Back Cover" : "Show Front Cover"}
                </Button>
              </div>
            </div>
            <div className="bookDetails-info">
              <h1 className="bookDetails-title">{bookDetails.title}</h1>
              <p
                className="bookDetails-about"
                dangerouslySetInnerHTML={{ __html: bookDetails.description }}
              />
              <div className="bookSection">
                <h3>Buy Links:</h3>
                <div className="PurchaseLinksContainer">
                  {Array.isArray(bookDetails.buyLinks) &&
                  bookDetails.buyLinks.length > 0 ? (
                    bookDetails.buyLinks.map((link, index) => (
                      <div key={index} className="purchaseLinkItem">
                        <div className="purchaseLinkCard">
                          <p>
                            <strong>Platform:</strong> {link.platformName},{" "}
                            <strong>Format:</strong> {link.bookFormat}
                          </p>
                          <Button
                            variant="primary"
                            className="purchaseLink-btn"
                            onClick={() => window.open(link.url, "_blank")}
                          >
                            Buy on {link.platformName}
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No purchase links available</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bookSection">
            <h2>Editorial Reviews</h2>
            <div className="iframeContainer">
              {Array.isArray(bookDetails.editorialReviews) &&
              bookDetails.editorialReviews.length > 0 ? (
                bookDetails.editorialReviews.map((review, index) => (
                  <div key={index} className="reviewItem">
                    <iframe
                      title={`Editorial Review ${index}`}
                      width="560"
                      height="315"
                      src={review.sourceUrl}
                      allowFullScreen
                    ></iframe>
                    <p>
                      <strong>Source:</strong> {review.source}
                    </p>
                  </div>
                ))
              ) : (
                <p>No editorial reviews available</p>
              )}
            </div>
          </div>

          <div className="bookSection">
            <h2>Videos</h2>
            <div className="iframeContainer">
              {Array.isArray(bookDetails.promotionalVideos) &&
              bookDetails.promotionalVideos.length > 0 ? (
                bookDetails.promotionalVideos.map((video, index) => (
                  <div key={index} className="videoItem">
                    <h3>
                      <strong>{video.caption}:</strong>
                    </h3>
                    <iframe
                      title={`Video ${index}`}
                      width="560"
                      height="315"
                      src={video.videoUrl}
                      allowFullScreen
                    ></iframe>
                  </div>
                ))
              ) : (
                <p>No promotional videos available</p>
              )}
            </div>
          </div>

          <div className="bookSection">
            <h2>Book Release Events</h2>
            <div className="iframeContainer">
              {Array.isArray(bookDetails.bookReleaseEvent) &&
              bookDetails.bookReleaseEvent.length > 0 ? (
                bookDetails.bookReleaseEvent.map((event, index) => (
                  <div key={index} className="videoItem">
                    <h3>
                      <strong>{event.caption}:</strong>
                    </h3>
                    <iframe
                      title={`Event Video ${index}`}
                      width="560"
                      height="315"
                      src={event.videoUrl}
                      allowFullScreen
                    ></iframe>
                  </div>
                ))
              ) : (
                <p>No book release event available</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default BookDetails;
