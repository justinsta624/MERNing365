<a ID="readme-top"></a>

<div align="center">

# ⭐ Book Search Engine: MERNing 365 ⭐

[![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)](https://www.w3schools.com/js/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_general_retarget-brand_gic-null_amers-us-ca_ps-all_desktop_eng_lead&utm_term=mongdb&utm_medium=cpc_paid_search&utm_ad=p&utm_ad_campaign_id=14291004602&adgroup=151115416695&cq_cmp=14291004602&gad_source=1&gclid=CjwKCAiA0bWvBhBjEiwAtEsoW7U5jewTZsrv_vMYRsA1oHATIeAMaxh3mWmm9pF1lyBTH-Jp8srp4BoCrQ0QAvD_BwE)
[![Express Badge](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![Node.js Badge](https://img.shields.io/badge/Node.js-393?style=for-the-badge&logo=nodedotjs&logoColor=fff)](https://nodejs.org/en)
[![GitHub Badge](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/justinsta624/)
[![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)](https://www.netlify.com/)


</div>
</div>

## Outcome

Followings are the outcomes of the challenge 21:

* The URL of the functional, deployed application </br>
[Deployed application: NETLIFY](https://merning365.netlify.app/) </br>

* The URL of the GitHub repository, with a unique name and a README that describes the project </br>
[Repository for this challenge](https://github.com/justinsta624/MERNing365)


## Screenshots

The following images show the web application's appearance and functionality:


<div align="center">

</div>
</div>

## Table of contents

- [Outcome](#outcome)
- [Screenshots](#screenshots)
- [User Story](#user-story)
- [Acceptance Critiera](#acceptance-criteria)
- [Tasks](#tasks)
- [Technologies Used](#technologies-used)
- [Reference](#reference)
- [License](#license)

## User Story <a ID="user-story"></a>

### This application was developed with this user story in mind:

```md
AS AN avid reader
I WANT to search for new books to read
SO THAT I can keep a list of books to purchase
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acceptance Criteria <a ID="acceptance-criteria"></a>

### This application was developed with the below User acceptance criteria:

```md
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input
field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description,
image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I'm presented with 3 inputs for a username, an email address, a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description,
image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title,
author, description, image, and a link to that book on the Google Books site and a button to remove
a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and
Login/Signup and an input field to search for books and a submit button  
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Tasks

### In General

* Refactor a fully functioning Google Books API search engine built with a RESTful API, turned it to be a GraphQL API built with Apollo Server.
* The app was built using the MERN stack with a React front end, MongoDB database, and Node.js/Express.js server and API. It's already set up to allow users to save book searches to the back end.

1. Set up an Apollo Server to use GraphQL queries and mutations to fetch and modify data, replacing the existing RESTful API.
2. Modify the existing authentication middleware so that it works in the context of a GraphQL API.
3. Create an Apollo Provider so that requests can communicate with an Apollo Server.
4. Deploy your application to Netlify

### Vite: Steps to follow

1. In the command line, navigate to the desired parent folder and run `npm create vite@latest`.
2. Enter the desired name of new project folder.
3. From the first list of options, select framework; for activities in class, we'll be using `React`.
4. From the second list of options, select variant; for activities in class, we'll be using `JavaScript`.
5. `cd` into your newly created project folder and run `npm install`.
6. Run `npm dev`/`npm run dev` and navigate to the prompted URL to see application.

### Further customization

1. Navigate to `package.json` and modify the `scripts` object so that it looks like this example:
```json
  "scripts": {
    "dev": "vite",
    "start": "vite",
    "build": "vite build",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

2. Navigate to the `vite.config.js` file and edit the export object so that it looks like this example:
```js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### Back-End Specifications

* `auth.js`: Update the auth middleware function to work with the GraphQL API.
* `server.js`: Implement the Apollo Server and apply it to the Express server as middleware.
* `Schemas` directory:
  * `index.js`: Export your typeDefs and resolvers.
  * `resolvers.js`: Define the query and mutation functionality to work with the Mongoose models.
  **Hint**: Use the functionality in the `user-controller.js` as a guide.
  * `typeDefs.js`: Define the necessary `Query` and `Mutation` types:
    * `Query` type:
      * `me`: Which returns a `User` type.
    * `Mutation` type:
      * `login`: Accepts an email and password as parameters; returns an `Auth` type.
      * `addUser`: Accepts a username, email, and password as parameters; returns an `Auth` type.
      * `saveBook`: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)
      * `removeBook`: Accepts a book's `bookId` as a parameter; returns a `User` type.
    * `User` type:
      * `_id`
      * `username`
      * `email`
      * `bookCount`
      * `savedBooks` (This will be an array of the `Book` type.)
    * `Book` type:
      * `bookId` (Not the `_id`, but the book's `id` value returned from Google's Book API.)
      * `authors` (An array of strings, as there may be more than one author.)
      * `description`
      * `title`
      * `image`
      * `link`
    * `Auth` type:
      * `token`
      * `user` (References the `User` type.)

### Front-End Specifications

* `queries.js`: This will hold the query `GET_ME`, which will execute the `me` query set up using Apollo Server.
* `mutations.js`:
  * `LOGIN_USER` will execute the `loginUser` mutation set up using Apollo Server.
  * `ADD_USER` will execute the `addUser` mutation.
  * `SAVE_BOOK` will execute the `saveBook` mutation.
  * `REMOVE_BOOK` will execute the `removeBook` mutation.
* `App.jsx`: Create an Apollo Provider to make every request work with the Apollo Server.
* `SearchBooks.jsx`:
  * Use the Apollo `useMutation()` Hook to execute the `SAVE_BOOK` mutation in the `handleSaveBook()` function instead of the `saveBook()` function imported from the `API` file.
  * Make sure you keep the logic for saving the book's ID to state in the `try...catch` block!
* `SavedBooks.jsx`:
  * Remove the `useEffect()` Hook that sets the state for `UserData`.
  * Instead, use the `useQuery()` Hook to execute the `GET_ME` query on load and save it to a variable named `userData`.
  * Use the `useMutation()` Hook to execute the `REMOVE_BOOK` mutation in the `handleDeleteBook()` function instead of the `deleteBook()` function that's imported from `API` file. (Make sure you keep the `removeBookId()` function in place!)
* `SignupForm.jsx`: Replace the `addUser()` functionality imported from the `API` file with the `ADD_USER` mutation functionality.
* `LoginForm.jsx`: Replace the `loginUser()` functionality imported from the `API` file with the `LOGIN_USER` mutation functionality.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies used <a ID="technologies-used"></a>

- **MongoDB**: NoSQL database system that stores data in a JSON-like format.
- **Express**: Web application framework for building RESTful APIs.
- **React**: Open-source JS library used for building user interfaces or UI components, particularly for single-page applications where user interactions are dynamic and frequent.
- **Node.js**: Runtime environment for executing server-side JavaScript code.
- **GraphQL**: Query language for APIs and a runtime environment for executing those queries against your data.
- **Apollo Provider**: Component provided by the Apollo Client library, which is a comprehensive state management library for handling GraphQL data.
- **Vite**: Build tool and development server for modern web development projects.
- **Netlify**: Web development platform that provides a variety of services to simplify the process of building, deploying, and managing modern web projects.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Reference

- [React Docs: Getting Started](https://react.dev/learn)
- [Vite Docs: Getting Started](https://vitejs.dev/guide/)
- [React Docs on JSX](https://react.dev/learn/writing-markup-with-jsx)
- [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/)
- [GraphQL Queries & Mutations](https://graphql.org/learn/queries/)
- [GraphQL: Passing Arguments](https://graphql.org/graphql-js/passing-arguments/)
- [JSON Web Tokens](https://jwt.io/introduction)
- [Apollo: Authentication and authorization](https://www.apollographql.com/docs/apollo-server/security/authentication/)
- [Vite Docs on deploying with Netlify](https://vitejs.dev/guide/static-deploy.html#netlify-with-git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application can be used in conjunction with licensing covered in  <b>MIT License</b>
</div>
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

---
© 2024 Hanbyeol Justin Lee. Confidential and Proprietary. All Rights Reserved.
