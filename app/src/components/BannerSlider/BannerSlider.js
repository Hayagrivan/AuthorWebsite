import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the BannerSlider functional component
const BannerSlider = ({ latestBook }) => {
  // State for managing the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Hook for navigation
  const navigate = useNavigate();

  // Effect to change slides at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 2);
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [latestBook]); // Re-run effect when the latestBook prop changes

  // Function to convert buffer data to base64 encoded data URL
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

  // Function to handle Explore button click
  const handleExploreClick = () => {
    if (latestBook) {
      navigate(`/books/${latestBook._id}`); // Navigate to the specific book page
    }
  };

  // Render the BannerSlider component
  return (
    <div className="banner-slider-container">
      <div className="banner-slider">
        {/* Slide 1: Latest Book */}
        <div className={currentSlide === 0 ? "slide active" : "slide"}>
          {latestBook && (
            <div className="slide-content">
              <h2>Latest Book Available For Purchase!!!</h2>
              <p className="short-description">{latestBook.shortDescription}</p>
              <button className="explore-button" onClick={handleExploreClick}>
                Explore More
              </button>
              {/* Use onClick to navigate */}
            </div>
          )}
          {latestBook && (
            <img
              src={convertBufferToDataURL(latestBook.frontCover.uploadedImage)}
              alt="Latest Book Slide"
              className="book-image"
            />
          )}
        </div>
        {/* Slide 2: Featured Blogs */}
        <div className={currentSlide === 1 ? "slide active" : "slide"}>
          <h1>Featured Blogs Coming Soon....Stay Tuned</h1>
        </div>
      </div>
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        <span
          className={currentSlide === 0 ? "indicator active" : "indicator"}
          onClick={() => setCurrentSlide(0)}
        />
        <span
          className={currentSlide === 1 ? "indicator active" : "indicator"}
          onClick={() => setCurrentSlide(1)}
        />
      </div>
    </div>
  );
};

// Export the BannerSlider component
export default BannerSlider;
