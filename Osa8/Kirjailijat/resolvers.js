const { GraphQLError } = require("graphql")
const Author = require("./models/author")
const Books = require("./models/books")
const jwt = require("jsonwebtoken")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const createUser = (args) => {
  const user = new User({
    username: args.username,
    favoriteGenre: args.favoriteGenre,
  })

  try {
    return user.save()
  } catch (error) {
    throw new GraphQLError("Creating the user failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args.username,
        error,
      },
    })
  }
}

const login = async (args) => {
  const user = await User.findOne({ username: args.username })

  if (!user || args.password !== "secret") {
    throw new GraphQLError("wrong credentials", {
      extensions: {
        code: "BAD_USER_INPUT",
      },
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
}

const getAuthors = async () => {
  const authors = await Author.find({})
  const books = await Books.find({})

  const newAuthors = authors.map((author) => {
    let name = author.name
    let bookCount = 0
    Object.values(books).forEach((book) => {
      if (book.author === name) bookCount += 1
    })

    return {
      name,
      born: author.born,
      bookCount,
    }
  })

  return newAuthors
}

const getBooks = async (author = null, genre = null) => {
  let newBooks = await Books.find({})

  if (author !== null) {
    newBooks = newBooks.filter((book) => book.author === author)
  }
  if (genre !== null) {
    newBooks = newBooks.filter((book) => book.genres.includes(genre))
  }

  return newBooks
}

const addNewBook = async (args, context) => {
  if (!context.currentUser) {
    throw new GraphQLError("Adding New Book Failed", {
      extensions: {
        code: "USER_LOGIN_NEEDED",
        invalidArgs: context.currentUser,
      },
    })
  }

  const book = { ...args }

  // Check if the author exists
  if (!(await Author.exists({ name: book.author }))) {
    const newAuthor = new Author({ name: book.author })
    try {
      await newAuthor.save()
    } catch (error) {
      throw new GraphQLError("Saving new author failed", {
        extensions: {
          code: "BAD_USER_INPUT",
          invalidArgs: args.author,
          error,
        },
      })
    }
  }

  const newBook = new Books(book)
  try {
    await newBook.save()
    pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
    return newBook
  } catch (error) {
    throw new GraphQLError("Saving book failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: args,
        error,
      },
    })
  }
}

const editAuthor = async ({ name, newAge }, context) => {
  if (!context.currentUser) {
    throw new GraphQLError("Editing User Failed", {
      extensions: {
        code: "USER_LOGIN_NEEDED",
        invalidArgs: context.currentUser,
      },
    })
  }

  if (!(await Author.exists({ name }))) return null

  const newData = {
    name,
    born: newAge,
  }

  try {
    return Author.findOneAndUpdate({ name }, newData)
  } catch {
    throw new GraphQLError("Updating Author Failed", {
      extensions: {
        code: "BAD_USER_INPUT",
        invalidArgs: newAge,
        error,
      },
    })
  }
}

const resolvers = {
  Query: {
    bookCount: () => Books.count({}).then((res) => res),
    authorCount: () => Author.count({}).then((res) => res),
    allBooks: (root, args) =>
      getBooks((author = args.author), (genre = args.genre)),
    allAuthors: getAuthors,
    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: (root, args, context) => addNewBook(args, context),
    editAuthor: (root, args, context) =>
      editAuthor({ name: args.name, newAge: args.setBornTo }, context),
    createUser: (root, args) => createUser(args),
    login: (root, args) => login(args),
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
}

module.exports = resolvers
