const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  publishedYear: { type: String },
  isbn10: { type: String },
  isbn13: { type: String },
  language: { type: String },
  publisher: { type: String },
  numberOfPages: { type: String },
  isLatestBook: { type: Boolean },
  description: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  frontCover: {
    uploadedImage: { type: Buffer },
  },
  backCover: {
    uploadedImage: { type: Buffer },
  },
  editorialReviews: [
    {
      source: { type: String },
      sourceUrl: { type: String },
      uploadedImage: { type: Buffer },
      date: { type: Date },
    },
  ],
  publicReviews: [
    {
      source: { type: String },
      sourceUrl: { type: String },
      uploadedImage: { type: Buffer },
      date: { type: Date },
    },
  ],
  memberReviews: [
    {
      userID: { type: String },
      reviewRating: { type: Number, default: 0, min: 0, max: 5 },
      reviewComment: { type: String },
      date: { type: Date },
    },
  ],
  promotionalVideos: [
    {
      videoUrl: { type: String },
      source: { type: String },
      caption: { type: String },
      date: { type: Date },
    },
  ],
  bookReleaseEvent: [
    {
      videoUrl: { type: String },
      source: { type: String },
      caption: { type: String },
      date: { type: Date },
    },
  ],
  buyLinks: [
    {
      platformName: {
        type: String,
      },
      platformLogo: {
        uploadedImage: { type: Buffer },
      },
      bookFormat: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
