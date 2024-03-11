// Importing necessary modules from mongoose and bcrypt
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Importing the bookSchema from the Book.js file
const bookSchema = require('./Book');

// Defining the user schema
const userSchema = new Schema(
  {
    username: {
      type: String, // String representing the username
      required: true, // Username is a required field
      unique: true, // Username must be unique
    },
    email: {
      type: String, // String representing the email address
      required: true, // Email is a required field
      unique: true, // Email must be unique
      match: [/.+@.+\..+/, 'Must use a valid email address'], // Email format validation
    },
    password: {
      type: String, // String representing the user's password
      required: true, // Password is a required field
    },
    // savedBooks is an array of data that adheres to the bookSchema
    savedBooks: [bookSchema], // Using the bookSchema for the savedBooks array
  },
  // Configuring options for toJSON (using virtuals)
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Middleware to hash user password before saving it to the database
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual field to get the bookCount, representing the number of saved books
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

// Creating the User model using the userSchema
const User = model('User', userSchema);

// Exporting the User model to be used in other files
module.exports = User;
