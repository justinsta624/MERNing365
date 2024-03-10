// Importing necessary components and utilities from React, react-bootstrap, and custom modules
import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { ADD_BOOK } from '../utils/mutations';
import { useMutation } from '@apollo/client';

// Defining the SearchBooks functional component
const SearchBooks = () => {
  // State for holding returned Google API data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // State for holding search field data
  const [searchInput, setSearchInput] = useState('');

  // State for managing saved book IDs retrieved from local storage
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // Using useEffect to save book IDs to local storage when the component unmounts
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Using useMutation hook for adding a book
  const [addBook, { mutationError }] = useMutation(ADD_BOOK);

  // Function to handle form submission and search for books
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      // Fetching data from the Google Books API based on the search input
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      // Extracting relevant book data from the API response
      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      // Updating the state with the searched book data
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle saving a book
  const handleSaveBook = async (bookId) => {
    // Finding the book to save based on its bookId
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // Returning if the user is not authenticated
    if (!token) {
      return false;
    }

    try {
      // Using the ADD_BOOK mutation to save the book
      const responseFromMutation = await addBook({
        variables: {
          content: bookToSave
        }
      });
      console.log(responseFromMutation);

      // Updating the state with the newly saved bookId
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      // Handling errors and logging relevant information
      console.error(err);
      console.log('Mutation error on attempting to save book follows:');
      console.log(mutationError);
    }
  };

  // Rendering the SearchBooks component with search form and results
  return (
    <>
      {/* Header section */}
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          {/* Form for searching books */}
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                {/* Button for submitting the search form */}
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* Container for displaying search results */}
      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        {/* Displaying searched books in a row of cards */}
        <Row>
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                {/* Card for each searched book */}
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {/* Button to save the book (if the user is logged in) */}
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
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

// Exporting the SearchBooks component
export default SearchBooks;
