// Importing useState hook from React
import { useState } from 'react';
// Importing Form, Button, and Alert components from react-bootstrap
import { Form, Button, Alert } from 'react-bootstrap';

// Importing Auth utility for handling user authentication
import Auth from '../utils/auth';
// Importing LOGIN mutation and useMutation hook from Apollo Client
import { LOGIN } from '../utils/mutations';
import { useMutation } from '@apollo/client';

// Defining the LoginForm functional component
const LoginForm = () => {
  // Initializing state for user form data (email and password)
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // Initializing state for form validation (currently set to false)
  const [validated] = useState(false);
  // Initializing state for showing/hiding the login error alert
  const [showAlert, setShowAlert] = useState(false);

  // Handling changes in the input fields of the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Updating the userFormData state using the spread operator
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Using the LOGIN mutation with the useMutation hook
  const [login, { loginError }] = useMutation(LOGIN);

  // Handling the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Checking form validity and preventing submission if invalid
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Attempting to log in using the provided user credentials
      const { data } = await login({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      // Logging in the user and storing the token in the Auth utility
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      console.log(loginError);
      // Showing the alert in case of a login error
      setShowAlert(true);
    }

    // Resetting the userFormData state after form submission
    setUserFormData({
      email: '',
      password: '',
    });
  };

  // Rendering the login form using the Form, Alert, and Button components
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Displaying an alert for login errors */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>
        {/* Input field for the email */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          {/* Validation feedback for the email input */}
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Input field for the password */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          {/* Validation feedback for the password input */}
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        {/* Submit button */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

// Exporting the LoginForm component
export default LoginForm;