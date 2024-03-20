// Import necessary dependencies and components
import React, { useState } from "react";
import { Upload, X, Trash, Plus } from "react-bootstrap-icons";
import "./AddBookForm.css";

// Define the BookForm functional component
const AddBookForm = ({ onClose, onImageUpload }) => {
  // Define initial form data state using useState hook
  const [formData, setFormData] = useState({
    // Initial state for each form field
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    isbn10: "",
    isbn13: "",
    language: "",
    publisher: "",
    numberOfPages: "",
    isLatestBook: false,
    description: "",
    shortDescription: "",
    frontCover: { uploadedImage: null },
    backCover: { uploadedImage: null },
    editorialReviews: [],
    publicReviews: [],
    promotionalVideos: [],
    bookReleaseEvent: [],
    buyLinks: [],
  });

  // Handle form submission
  const handleFormSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();
    // Log form data to the console
    console.log("Form Data:", formData);

    // Create FormData object to send files
    const form = new FormData();

    // Append text data to form
    // Logic to append data to form based on formData
    Object.keys(formData).forEach((key) => {
      if (key !== "frontCover" && key !== "backCover") {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            Object.keys(item).forEach((field) => {
              // Append null values as empty strings
              if (field === "uploadedImage") {
                form.append(`${key}[${index}][${field}]`, item[field] || "");
              } else {
                form.append(`${key}[${index}][${field}]`, item[field]);
              }
            });
          });
        } else {
          form.append(key, formData[key]);
        }
      }
    });

    // Append files to form
    form.append("frontCover", formData.frontCover.uploadedImage);
    form.append("backCover", formData.backCover.uploadedImage);

    // Construct API URL based on edit mode
    const apiUrl = "/api/books/add-book";

    // Log form data before sending to the server
    console.log("Form Data (before sending to server):", formData);

    // Send the form data to the server
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: form,
      });

      // Log the response from the server
      console.log("Response:", response);

      // Handle success or error based on server response
      if (response.ok) {
        console.log("Book added successfully");
        onClose(); // Close the form after successful submission
      } else {
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error.message);
    }
    onClose(); // Close the form after submission
  };

  // Handle input change for text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image change for front and back covers
  const handleImageChange = (e, params) => {
    const { fieldName, arrayName, index } = params;
    const file = e.target.files[0];
    onImageUpload(file, fieldName); // Assuming this function handles image upload elsewhere in your code

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        if (arrayName) {
          const updatedArray = [...formData[arrayName]];
          updatedArray[index][fieldName] = reader.result;
          setFormData((prevFormData) => ({
            ...prevFormData,
            [arrayName]: updatedArray,
          }));
        } else {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [fieldName]: reader.result,
          }));
        }
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle input change for array items (reviews, videos, events, etc.)
  const handleInputChange = (e, index, field, arrayName) => {
    // Logic to handle input change for array items and update formData
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = e.target.value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Handle removal of an item from arrays (reviews, videos, events, etc.)
  const handleRemoveItem = (index, arrayName) => {
    // Logic to handle removal of an item from arrays and update formData
    const updatedArray = [...formData[arrayName]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  // Handle addition of an item to arrays (reviews, videos, events, etc.)
  const handleAddItem = (arrayName, newItem) => {
    // Logic to handle addition of an item to arrays and update formData
    setFormData({
      ...formData,
      [arrayName]: [...formData[arrayName], newItem],
    });
  };

  // Initialize arrays if they're null
  if (!formData.editorialReviews) formData.editorialReviews = [];
  if (!formData.publicReviews) formData.publicReviews = [];
  if (!formData.memberReviews) formData.memberReviews = [];
  if (!formData.promotionalVideos) formData.promotionalVideos = [];
  if (!formData.bookReleaseEvent) formData.bookReleaseEvent = [];
  if (!formData.buyLinks) formData.buyLinks = [];

  // Return JSX for the BookForm component
  return (
    <div className="bookFormContainer">
      <button className="closeButton close" onClick={onClose}>
        <X />
      </button>
      <h2>Add New Book</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <label htmlFor="genre">Genre</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
        <label htmlFor="publishedYear">Published Year</label>
        <input
          type="text"
          id="publishedYear"
          name="publishedYear"
          value={formData.publishedYear}
          onChange={handleChange}
        />
        <label htmlFor="isbn10">ISBN 10</label>
        <input
          type="text"
          id="isbn10"
          name="isbn10"
          value={formData.isbn10}
          onChange={handleChange}
        />
        <label htmlFor="isbn13">ISBN 13</label>
        <input
          type="text"
          id="isbn13"
          name="isbn13"
          value={formData.isbn13}
          onChange={handleChange}
        />
        <label htmlFor="language">Language</label>
        <input
          type="text"
          id="language"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
        <label htmlFor="publisher">Publisher</label>
        <input
          type="text"
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
        <label htmlFor="numberOfPages">Number of Pages</label>
        <input
          type="text"
          id="numberOfPages"
          name="numberOfPages"
          value={formData.numberOfPages}
          onChange={handleChange}
        />
        <label htmlFor="isLatestBook">Is Latest Book?</label>
        <input
          type="checkbox"
          id="isLatestBook"
          name="isLatestBook"
          checked={formData.isLatestBook}
          onChange={() =>
            setFormData({ ...formData, isLatestBook: !formData.isLatestBook })
          }
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={10}
        />
        <label htmlFor="shortDescription">Short Description</label>
        <textarea
          id="shortDescription"
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows={10}
        />
        <label htmlFor="frontCoverImage">Front Cover Image</label>
        <input
          type="file"
          accept="image/*"
          id="frontCoverImage"
          name="frontCover.uploadedImage"
          onChange={(e) =>
            handleImageChange(e, {
              fieldName: "frontCover",
              arrayName: null,
              index: null,
            })
          }
        />
        {/* Back Cover */}
        <label htmlFor="backCoverImage">Back Cover Image</label>
        <input
          type="file"
          accept="image/*"
          id="backCoverImage"
          name="backCover.uploadedImage"
          onChange={(e) =>
            handleImageChange(e, {
              fieldName: "backCover",
              arrayName: null,
              index: null,
            })
          }
        />
        {/* Editorial Reviews */}
        <label htmlFor="editorialReviews">Editorial Reviews</label>
        {formData.editorialReviews.map((review, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter Source`}
              className="mr-2"
              value={review.source}
              onChange={(e) =>
                handleInputChange(e, index, "source", "editorialReviews")
              }
            />
            <input
              type="text"
              placeholder={`Enter Source URL`}
              className="mr-2"
              value={review.sourceUrl}
              onChange={(e) =>
                handleInputChange(e, index, "sourceUrl", "editorialReviews")
              }
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Upload image"
              className="mr-2"
              onChange={(e) =>
                handleImageChange(e, {
                  index,
                  fieldName: "uploadedImage",
                  arrayName: "editorialReviews",
                })
              }
            />
            <input
              type="date"
              placeholder={`Enter Review Date`}
              className="mr-2"
              value={review.date}
              onChange={(e) =>
                handleInputChange(e, index, "date", "editorialReviews")
              }
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "editorialReviews")}
            >
              <Trash />
              Remove Editorial Review
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("editorialReviews", {
              source: "",
              sourceUrl: "",
              uploadedImage: null,
              date: "",
            })
          }
        >
          <Plus /> Add Editorial Review
        </button>

        {/* Public Reviews */}
        <label htmlFor="publicReviews">Public Reviews</label>
        {formData.publicReviews.map((review, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter Source`}
              className="mr-2"
              value={review.source}
              onChange={(e) =>
                handleInputChange(e, index, "source", "publicReviews")
              }
            />
            <input
              type="text"
              placeholder={`Enter Source URL`}
              className="mr-2"
              value={review.sourceUrl}
              onChange={(e) =>
                handleInputChange(e, index, "sourceUrl", "publicReviews")
              }
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Upload image"
              className="mr-2"
              onChange={(e) =>
                handleImageChange(e, {
                  index,
                  fieldName: "uploadedImage",
                  arrayName: "publicReviews",
                })
              }
            />
            <input
              type="date"
              placeholder={`Enter Review Date`}
              className="mr-2"
              value={review.date}
              onChange={(e) =>
                handleInputChange(e, index, "date", "publicReviews")
              }
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "publicReviews")}
            >
              <Trash />
              Remove Public Review
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("publicReviews", {
              source: "",
              sourceUrl: "",
              uploadedImage: null,
              date: "",
            })
          }
        >
          <Plus /> Add Public Review
        </button>

        <label htmlFor="memberReviews">Member Reviews</label>
        {formData.memberReviews.map((review, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter user ID`}
              className="mr-2"
              value={review.userID}
              onChange={(e) =>
                handleInputChange(e, index, "userID", "memberReviews")
              }
            />
            <input
              type="number"
              placeholder={`Enter review rating (0-5)`}
              className="mr-2"
              value={review.reviewRating}
              onChange={(e) =>
                handleInputChange(e, index, "reviewRating", "memberReviews")
              }
            />
            <textarea
              placeholder={`Enter review comment`}
              className="mr-2"
              value={review.reviewComment}
              onChange={(e) =>
                handleInputChange(e, index, "reviewComment", "memberReviews")
              }
            />
            <input
              type="date"
              placeholder={`Enter review date`}
              className="mr-2"
              value={review.date}
              onChange={(e) =>
                handleInputChange(e, index, "date", "memberReviews")
              }
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "memberReviews")}
            >
              <Trash />
              Remove Review
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("memberReviews", {
              userID: "",
              reviewRating: 0,
              reviewComment: "",
              date: "",
            })
          }
        >
          <Plus /> Add Review
        </button>

        {/* Promotional Videos */}
        <label htmlFor="promotionalVideos">Promotional Videos</label>
        {formData.promotionalVideos.map((video, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter Video URL`}
              className="mr-2"
              value={video.videoUrl}
              onChange={(e) =>
                handleInputChange(e, index, "videoUrl", "promotionalVideos")
              }
            />
            <input
              type="text"
              placeholder={`Enter Video Source`}
              className="mr-2"
              value={video.source}
              onChange={(e) =>
                handleInputChange(e, index, "source", "promotionalVideos")
              }
            />
            <input
              type="text"
              placeholder={`Enter Video Caption`}
              className="mr-2"
              value={video.caption}
              onChange={(e) =>
                handleInputChange(e, index, "caption", "promotionalVideos")
              }
            />
            <input
              type="date"
              placeholder={`Enter Video date`}
              className="mr-2"
              value={video.date}
              onChange={(e) =>
                handleInputChange(e, index, "date", "promotionalVideos")
              }
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "promotionalVideos")}
            >
              <Trash />
              Remove Promotional Video
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("promotionalVideos", {
              videoUrl: "",
              source: "",
              caption: "",
              date: "",
            })
          }
        >
          <Plus /> Add Promotional Video
        </button>

        {/* Book Release Events */}
        <label htmlFor="bookReleaseEvents">Book Release Events</label>
        {formData.bookReleaseEvent.map((event, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter video URL`}
              className="mr-2"
              value={event.videoUrl}
              onChange={(e) =>
                handleInputChange(e, index, "videoUrl", "bookReleaseEvent")
              }
            />
            <input
              type="text"
              placeholder={`Enter Video Source`}
              className="mr-2"
              value={event.source}
              onChange={(e) =>
                handleInputChange(e, index, "source", "bookReleaseEvent")
              }
            />
            <input
              type="text"
              placeholder={`Enter Video Caption`}
              className="mr-2"
              value={event.caption}
              onChange={(e) =>
                handleInputChange(e, index, "caption", "bookReleaseEvent")
              }
            />
            <input
              type="date"
              placeholder={`Enter Video date`}
              className="mr-2"
              value={event.date}
              onChange={(e) =>
                handleInputChange(e, index, "date", "bookReleaseEvent")
              }
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "bookReleaseEvent")}
            >
              <Trash />
              Remove Book Release Event
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("bookReleaseEvent", {
              videoUrl: "",
              source: "",
              caption: "",
              date: "",
            })
          }
        >
          <Plus /> Add Book Release Event
        </button>

        {/* Buy Links */}
        <label htmlFor="buyLinks">Buy Links</label>
        {formData.buyLinks.map((link, index) => (
          <div key={index} className="d-flex mb-2">
            <input
              type="text"
              placeholder={`Enter Platform Name`}
              className="mr-2"
              value={link.platformName}
              onChange={(e) =>
                handleInputChange(e, index, "platformName", "buyLinks")
              }
            />
            <input
              type="file"
              accept="image/*"
              placeholder="Upload platform logo"
              className="mr-2"
              onChange={(e) =>
                handleImageChange(e, {
                  index,
                  fieldName: "platformLogo",
                  arrayName: "buyLinks",
                })
              }
            />
            <input
              type="text"
              placeholder={`Enter book format for link`}
              className="mr-2"
              value={link.bookFormat}
              onChange={(e) =>
                handleInputChange(e, index, "bookFormat", "buyLinks")
              }
            />
            <input
              type="text"
              placeholder={`Enter URL`}
              className="mr-2"
              value={link.url}
              onChange={(e) => handleInputChange(e, index, "url", "buyLinks")}
            />
            <button
              type="button"
              className="btn btn-danger removeButton"
              onClick={() => handleRemoveItem(index, "buyLinks")}
            >
              <Trash />
              Remove Buy Link
            </button>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary addButton"
          onClick={() =>
            handleAddItem("buyLinks", {
              platformName: "",
              platformLogo: null,
              bookFormat: "",
              url: "",
            })
          }
        >
          <Plus /> Add Buy Link
        </button>

        <button type="submit">
          <Upload /> "Add Book"
        </button>
      </form>
    </div>
  );
};

// Export the BookForm component
export default AddBookForm;
