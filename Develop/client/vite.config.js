// Importing the defineConfig function from Vite for configuration
import { defineConfig } from 'vite';

// Importing the Vite React plugin
import react from '@vitejs/plugin-react';

// Defining the Vite configuration using defineConfig
export default defineConfig({
  // Adding the React plugin to Vite
  plugins: [react()],

  // Configuring the development server settings
  server: {
    // Setting the port for the development server
    port: 3000,

    // Automatically opening the default browser when the development server starts
    open: true,

    // Configuring a proxy for the '/graphql' route to redirect requests to another server
    proxy: {
      '/graphql': {
        // Target server for proxying GraphQL requests
        target: 'http://localhost:3001',

        // Disabling SSL certificate verification (useful when using a self-signed certificate in development)
        secure: false,

        // Changing the origin of the request to the target server
        changeOrigin: true
      }
    }
  }
});