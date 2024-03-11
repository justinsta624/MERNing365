// Importing the gql function from the '@apollo/client' library //
import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token ## JWT token returned by the server
      user {
        _id ## User ID
        username ## User's username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token ## JWT token returned by the server
        user {
            _id ## User ID
            username ## User's username
        }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation saveBook($content: BookArrayInput!) {
    saveBook(content: $content) {
        savedBooks {
          authors ## Book authors
          description ## Book description
          bookId ## Book ID
          image ## Book image
          link ## Book link
          title ## Book title
        }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        savedBooks {
          authors ## Book authors
          description ## Book description
          bookId ## Book ID
          image ## Book image
          link ## Book link
          title ## Book title
        }
    }
  }
`;