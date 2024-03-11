// Importing the User model from '../models'
const { User } = require('../models');
// Importing the signToken function from '../utils/auth'
const { signToken } = require('../utils/auth');

// Exporting an object with methods to handle user-related operations
module.exports = {
  // Method to get a single user by either their id or username
  async getSingleUser({ user = null, params }, res) {
    // Finding a user based on the provided id or username
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    // Handling the case where no user is found
    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    // Sending the found user as JSON response
    res.json(foundUser);
  },

  // Method to create a user, sign a token, and send it back
  async createUser({ body }, res) {
    // Creating a user based on the provided request body
    const user = await User.create(body);

    // Handling the case where user creation fails
    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }

    // Signing a token for the user
    const token = signToken(user);

    // Sending the token and user details as JSON response
    res.json({ token, user });
  },

  // Method to login a user, sign a token, and send it back
  async login({ body }, res) {
    // Finding a user based on either username or email
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

    // Handling the case where no user is found
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    // Checking if the provided password is correct
    const correctPw = await user.isCorrectPassword(body.password);

    // Handling the case where the password is incorrect
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // Signing a token for the user
    const token = signToken(user);

    // Sending the token and user details as JSON response
    res.json({ token, user });
  },

  // Method to save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // The user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user);
    try {
      // Updating the user to add the new book to the `savedBooks` set
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: body } },
        { new: true, runValidators: true }
      );

      // Sending the updated user as a JSON response
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      // Handling validation or other errors and sending them as a JSON response
      return res.status(400).json(err);
    }
  },

  // Method to remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    // Updating the user to pull the specified bookId from the `savedBooks` array
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: { bookId: params.bookId } } },
      { new: true }
    );

    // Handling the case where the user is not found
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }

    // Sending the updated user as a JSON response
    return res.json(updatedUser);
  },
};
