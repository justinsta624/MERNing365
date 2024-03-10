// Importing the jwtDecode function from the 'jwt-decode' library
import { jwtDecode } from 'jwt-decode';

// Creating a class for authentication services
class AuthService {
  // Method to get user data by decoding the token
  getProfile() {
    return jwtDecode(this.getToken());
  }

  // Method to check if the user is logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // Handwaving here
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      // Compares the token's expiration time with the current time
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Method to retrieve the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Method to save the user token to localStorage and redirect to '/'
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  // Method to log out by clearing the user token and profile data from localStorage
  logout() {
    localStorage.removeItem('id_token');
    // This will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

// Exporting an instance of the AuthService class
export default new AuthService();