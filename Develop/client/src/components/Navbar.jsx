// Importing useState hook from React
import { useState } from 'react';
// Importing Link component from react-router-dom for navigation
import { Link } from 'react-router-dom';
// Importing Bootstrap components for Navbar, Navigation, Container, Modal, and Tabs
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// Importing SignUpForm and LoginForm components
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

// Importing Auth utility for handling user authentication
import Auth from '../utils/auth';

// Defining the AppNavbar functional component
const AppNavbar = () => {
  // Setting modal display state using useState hook
  const [showModal, setShowModal] = useState(false);

  // Rendering the Navbar component with Bootstrap styling
  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          {/* Brand link for navigating to the home page */}
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* Navigation link to the book search page */}
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {/* Conditional rendering based on user authentication status */}
              {Auth.loggedIn() ? (
                <>
                  {/* Navigation link to the saved books page */}
                  <Nav.Link as={Link} to='/saved'>
                    See Your Books
                  </Nav.Link>
                  {/* Logout link */}
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                // Login/Sign Up link triggering the modal display
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Setting up the modal for login/signup */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* Tab container to switch between signup and login components */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              {/* Navigation tabs for login and signup */}
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              {/* Tab pane for the login component */}
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              {/* Tab pane for the signup component */}
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

// Exporting the AppNavbar component
export default AppNavbar;