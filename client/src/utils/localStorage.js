// Function to get saved book IDs from localStorage
export const getSavedBookIds = () => {
  // Retrieve saved book IDs from localStorage, parse JSON, or default to an empty array
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  // Return the array of saved book IDs
  return savedBookIds;
};

// Function to save an array of book IDs to localStorage
export const saveBookIds = (bookIdArr) => {
  // If the array of book IDs is not empty, stringify and save to localStorage
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    // If the array is empty, remove the 'saved_books' key from localStorage
    localStorage.removeItem('saved_books');
  }
};

// Function to remove a specific book ID from the array of saved book IDs in localStorage
export const removeBookId = (bookId) => {
  // Retrieve saved book IDs from localStorage, parse JSON, or default to null
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  // If there are no saved book IDs, return false
  if (!savedBookIds) {
    return false;
  }

  // Filter out the specified book ID from the array
  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);

  // Save the updated array back to localStorage
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  // Return true to indicate successful removal
  return true;
};
