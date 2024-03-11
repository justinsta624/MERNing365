// Importing necessary modules for JSON Web Token (JWT) and GraphQL errors
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');

// Setting token secret and expiration date from environment variables
const secret = process.env.JWT_SECRET;
const expiration = '2h';

// Exporting authentication-related functions and an AuthenticationError
module.exports = {
  // Function for handling authentication middleware
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.query, headers, or req.body
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is sent in headers, format it as ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // If no token is present, return the original request object
    if (!token) {
      return req;
    }

    // Verify the token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token:');
      console.error(err);
    }

    // Return the modified request object with user data if authenticated
    return req;
  },
  // Function to sign a JWT token with user data
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    // Sign the token with the payload, secret, and expiration
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  // Error to throw if the user is not authenticated
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
};