// Importing the User model and authentication utilities
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// GraphQL resolvers defining the Query and Mutation operations
const resolvers = {
    Query: {
        // Resolver to get the current logged-in user and their saved books
        me: async (parent, args, context) => {
            const foundUser = await User.findOne({
                _id: context.user._id,
            })
                .populate('savedBooks');

            if (!foundUser) {
                // Throw AuthenticationError if user is not found
                throw AuthenticationError;
            }

            return foundUser;
        }
    },
    Mutation: {
        // Resolver to create a new user, sign their info to JWT token, and return both the token and user
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({
                username: username,
                email: email,
                password: password,
            });

            if (!user) {
                // Throw AuthenticationError if user creation fails
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
        },
        // Resolver to login a user, sign their token for authentication, and return the token and user object
        login: async (parent, { email, password }) => {
            // Find a user by email in the database and verify their password
            const user = await User.findOne({ email: email });
            if (!user) {
                // Throw AuthenticationError if user is not found
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                // Throw AuthenticationError if password is incorrect
                throw AuthenticationError;
            }
            const token = signToken(user);
            return ({ token, user });
        },
        // Resolver to save a book to a user's `savedBooks` subdocument
        saveBook: async (parent, { content }, context) => {
            try {
                // Find the user by ID and update their `savedBooks` field
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: content } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                // Throw AuthenticationError if an error occurs
                throw AuthenticationError;
            }
        },
        // Resolver to delete a book by ID from the user's `savedBooks` subdocument
        deleteBook: async (parent, params, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                // Throw AuthenticationError if user is not found
                throw AuthenticationError;
            }
            return updatedUser;
        }
    }
}

// Exporting the resolvers for use in Apollo Server
module.exports = resolvers;