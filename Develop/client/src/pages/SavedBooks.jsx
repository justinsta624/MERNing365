// Importing necessary components and utilities from React, react-bootstrap, and custom modules
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

// Importing GraphQL queries and mutations
import { QUERY_ME } from '../utils/queries';
import { DELETE_BOOK } from '../utils/mutations';

// Importing useQuery and useMutation hooks from Apollo Client
import { useQuery, useMutation } from '@apollo/client';

// Defining the SavedBooks functional component
const SavedBooks = () => {
  // Using useQuery hook to fetch data about the user's saved books
  const { loading, data } = useQuery(QUERY_ME);

  // Using useMutation hook for deleting a book
  const [deleteBook, { deleteBookError, deleteBookData }] = useMutation(DELETE_BOOK);

  // Function to handle deleting a book by its _id
  const handleDeleteBook = async (bookId) => {
    // Checking if the user is authenticated and retrieving the token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // Returning if the user is not authenticated
    if (!token) {
      return false;
    }

    try {
      // Using the DELETE_BOOK mutation to delete the book with the given bookId
      const { data } = await deleteBook({
        variables: { bookId: bookId }
      });

      // Logging the result and removing the bookId from local storage
      console.log(data.deleteBook);
      removeBookId(bookId);
      // Reloading the page to reflect the updated saved books list
      window.location.reload();
    } catch (err) {
      // Handling errors and logging relevant information
      console.error(err);
      console.log(deleteBookData);
      console.log(deleteBookError);
    }
  };

  // Loading message while fetching data
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Rendering the SavedBooks component with user's saved books
  return (
    <>
      {/* Header section */}
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        {/* Displaying the number of saved books */}
        <h2 className='pt-5'>
          {data.me.savedBooks.length
            ? `Viewing ${data.me.savedBooks.length} saved ${data.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        {/* Displaying saved books in a row of cards */}
        <Row>
          {data.me.savedBooks.map((book, index) => {
            return (
              <Col key={index} md="4">
                {/* Card for each saved book */}
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {/* Button to delete the book */}
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

// Exporting the SavedBooks component
export default SavedBooks;