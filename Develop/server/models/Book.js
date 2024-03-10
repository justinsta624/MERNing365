// Importing the Schema class from mongoose
const { Schema } = require('mongoose');

// Defining a subdocument schema for a book, which won't become its own model
// This schema will be used as part of the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String, // Array of strings representing authors' names
    },
  ],
  description: {
    type: String, // String representing the book's description
    required: true, // The description is a required field
  },
  // The bookId represents the saved book id from Google Books
  bookId: {
    type: String, // String representing the book's id
    required: true, // The bookId is a required field
  },
  image: {
    type: String, // String representing the URL of the book's image
  },
  link: {
    type: String, // String representing the URL link to the book
  },
  title: {
    type: String, // String representing the book's title
    required: true, // The title is a required field
  },
});

// Exporting the bookSchema to be used in other files
module.exports = bookSchema;