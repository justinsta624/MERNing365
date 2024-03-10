// Importing the gql function from the '@apollo/client' library
import { gql } from '@apollo/client';

// GraphQL mutation to create a new user
// The mutation expects parameters for username, email, and password
// The database will return a JWT token and the details of the added user
export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token // JWT token returned by the server
      user {
        _id // User ID
        username // User's username
      }
    }
  }
`;

// GraphQL mutation to login
// The mutation expects parameters for email and password
// The database will return a JWT signed token and the details of the logged-in user
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token // JWT token returned by the server
        user {
            _id // User ID
            username // User's username
        }
    }
  }
`;

// GraphQL mutation to add a book to the logged-in user's saved books
// The mutation expects an input parameter 'content' of type 'BookArrayInput'
// The server will return the updated list of saved books
export const ADD_BOOK = gql`
  mutation saveBook($content: BookArrayInput!) {
    saveBook(content: $content) {
        savedBooks {
          authors // Book authors
          description // Book description
          bookId // Book ID
          image // Book image
          link // Book link
          title // Book title
        }
    }
  }
`;

// GraphQL mutation to delete a logged-in user's saved book
// The mutation expects a parameter 'bookId' of type String
// The server will return the updated list of saved books after deletion
export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        savedBooks {
          authors // Book authors
          description // Book description
          bookId // Book ID
          image // Book image
          link // Book link
          title // Book title
        }
    }
  }
`;