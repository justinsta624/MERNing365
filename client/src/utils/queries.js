// Importing the gql function from the '@apollo/client' library
import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me { ## Invoking the 'me' query on the server
            _id ## User ID
            username ## User's username
            savedBooks { ## Array of saved books for the user
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