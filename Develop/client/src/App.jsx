// Importing the 'App.css' file for styling
import './App.css';

// Importing necessary components and functions from Apollo Client and React Router
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

// Importing the 'Navbar' component
import Navbar from './components/Navbar';

// Creating an HTTP link for the Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql', // URI for the GraphQL endpoint
});

// Creating an authentication link to set the authorization header with a token
const authLink = setContext((_, { headers }) => {
  // Retrieving the token from localStorage
  const token = localStorage.getItem('id_token');

  // Returning the headers with the authorization token if it exists
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Setting the 'authorization' header
    },
  };
});

// Creating an instance of Apollo Client with the configured links and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Concatenating the authentication link with the HTTP link
  cache: new InMemoryCache(), // Configuring an in-memory cache
});

// Main App component
function App() {
  return (
    // Wrapping the entire application with ApolloProvider to enable Apollo Client functionality
    <ApolloProvider client={client}>
      {/* Including the 'Navbar' component */}
      <Navbar />
      {/* Rendering the content based on the current route using 'Outlet' from React Router */}
      <Outlet />
    </ApolloProvider>
  );
}

// Exporting the 'App' component as the default export
export default App;