// Importing useState hook from React
import { useState } from 'react';
// Importing Form, Button, and Alert components from react-bootstrap
import { Form, Button, Alert } from 'react-bootstrap';

// Importing Auth utility for handling user authentication
import Auth from '../utils/auth';

// Importing useMutation hook and ADD_USER mutation from Apollo Client
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

// Defining the SignupForm functional component
const SignupForm = () => {
  // Setting initial form state for username, email, and password
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // Setting state for form validation (currently set to false)
  const [validated] = useState(false);
  // Setting state for displaying alert messages
  const [showAlert, setShowAlert] = useState(false);

  // Handling changes in the input fields of the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Updating the userFormData state using the spread operator
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Using the ADD_USER mutation with the useMutation hook
  const [createUser, { createUserError }] = useMutation(ADD_USER);

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
      // Attempting to create a new user using the provided form data
      const { data } = await createUser({
        variables: { ...userFormData },
      });

      // Logging in the new user and storing the token in the Auth utility
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
      console.log(createUserError);
      // Showing the alert in case of a signup error
      setShowAlert(true);
    }

    // Resetting the userFormData state after form submission
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  // Rendering the signup form using the Form, Alert, and Button components
  return (
    <>
      {/* Form element with validation and submission handling */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Alert to display signup errors */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        {/* Input field for the username */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          {/* Validation feedback for the username input */}
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Input field for the email */}
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
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
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

// Exporting the SignupForm component
export default SignupForm;
