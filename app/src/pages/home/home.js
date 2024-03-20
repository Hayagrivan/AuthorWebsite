import React, { useState, useEffect } from "react";
import BannerSlider from "../../components/BannerSlider/BannerSlider.js";
import BookCarousel from "../../components/BookCarousel/BookCarousel.js";
import "./home.css";

const Home = () => {
  // State to store information about the latest book
  const [latestBook, setLatestBook] = useState(null);

  // Fetch latest book and author introduction from the backend
  useEffect(() => {
    // Fetch the latest book
    fetch("/api/books/latestbook")
      .then((response) => response.json())
      .then((data) => setLatestBook(data))
      .catch((error) => console.error("Error fetching latest book:", error));
  }, []);

  return (
    <main className="home-page-container">
      {/* Banner Slider component with latest book information */}
      <BannerSlider latestBook={latestBook} />

      {/* Introduction section */}
      <section class="introduction-container">
        <h1>Welcome to the Captivating World of MK Sudarshan</h1>
        <p class="introduction-text">
          Delve into a realm where passion for writing intertwines with profound
          spiritual insights, illuminating the path of enlightenment. From his
          formative years as the editor of Loyola College's magazine to his
          esteemed contributions in publications like "The Times of India" and
          "The Hindu," Sudarshan's literary voyage has been characterized by an
          unwavering exploration of youth culture, religious history, and
          metaphysical thought.
        </p>
        <p class="introduction-text">
          His debut masterpiece, "Unusual Essays of an Unknown Sri Vaishnava,"
          pays homage to the revered philosopher Sri Ramanujacharya, garnering
          acclaim worldwide. Continuing his journey, Sudarshan enthralls readers
          with "THE NONDESCRIPT GOD: Abstraction or Paragon," a scholarly
          odyssey into the realm of metaphysics.
        </p>
        <p class="introduction-text">
          Amidst the challenges of the pandemic era, Sudarshan embarked on a
          profound literary endeavor, translating the revered epistles and
          discourses of HH Srimadh Azhagiyasingar into English. This endeavor
          culminated in the publication of "Epistles of a Prolific Pontiff," a
          compilation praised and released in the presence of esteemed pontiff,
          Srimad Ranganatha Yathindra Mahadesikan. Building upon this legacy,
          Sudarshan's latest work, "A Tale of Two Cities: THE DECLINE AND FALL
          OF THE 'UBAYA-VEDANTINS,'" delves into the untold history of the Sri
          Vaishnava community in Tamil Nadu, offering a narrative that resonates
          through the centuries.
        </p>
        <p class="introduction-text">
          Explore the literary landscape of MK Sudarshan, where each book serves
          as a beacon of enlightenment, inviting readers on a transformative
          journey of discovery and introspection.
        </p>
      </section>

      {/* Book Carousel component */}
      <BookCarousel />
    </main>
  );
};

export default Home;
