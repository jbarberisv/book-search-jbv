import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($userId: ID!, $description: String!, $bookId: String!, $title: String!, $authors: [String], $image: String, $link: String) {
    saveBook(userId: $userId, description: $description, bookId: $bookId, title: $title, authors: $authors, image: $image, link: $link) {
      _id
      username
      bookCount
    }
  }
`;
