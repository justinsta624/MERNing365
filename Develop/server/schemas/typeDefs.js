const typeDefs = `
    type Book {
        _id: ID!
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Auth {
        token: String!
        user: User
    }

    input BookArrayInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        me(_id: String, username: String): User 
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(content: BookArrayInput!): User
        deleteBook(bookId: String!): User
    }
`;

// Export the GraphQL schema definition
module.exports = typeDefs;