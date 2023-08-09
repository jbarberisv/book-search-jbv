// typeDefs.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }
  
  type Query {
    me: User
    user(username: String!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(userId: ID!, authors: [String], description: String!, bookId: String!, image: String, link: String, title: String!): User
  }
`;

module.exports = typeDefs;
