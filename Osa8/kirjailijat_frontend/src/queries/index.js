import { gql } from "@apollo/client"

export const ALL_BOOKS = gql`
  query Query($genre: String) {
    allBooks(genre: $genre) {
      author
      published
      title
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation Mutation(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author
      published
      genres
    }
  }
`

export const UPDATE_BIRTHYEAR = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

export const GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`

export const GET_USER_GENRE = gql`
  query Query {
    me {
      favoriteGenre
    }
  }
`

export const ADD_SUBSCRIPTION = gql`
  subscription Subscription {
    bookAdded {
      author
      title
      published
    }
  }
`
