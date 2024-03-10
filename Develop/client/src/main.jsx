// Importing the necessary functions and libraries from React, React DOM, React Router, and Bootstrap
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importing the main 'App' component and other page components
import App from './App.jsx';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';

// Creating a browser router with route configurations
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main application element
    errorElement: <h1 className='display-2'>Wrong page!</h1>, // Element to display in case of an error
    children: [
      {
        index: true, // Index route, corresponds to '/'
        element: <SearchBooks /> // Component to render for the index route
      },
      {
        path: '/saved', // Nested route for '/saved'
        element: <SavedBooks /> // Component to render for the '/saved' route
      }
    ]
  }
]);

// Creating a root for rendering using React.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} /> // Wrapping the app with the router provider
);