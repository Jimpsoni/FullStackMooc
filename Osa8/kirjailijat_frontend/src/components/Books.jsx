import { useQuery } from "@apollo/client"

import { useSubscription } from "@apollo/client"

import { ALL_BOOKS, GENRES, ADD_SUBSCRIPTION } from "../queries"
import { useEffect, useState } from "react"

const Books = ({ defaultGenre }) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(defaultGenre)
  const result = useQuery(ALL_BOOKS, { variables: { genre } })
  const genresResult = useQuery(GENRES)

  useEffect( () => {
    if (!result.loading) {
      setBooks(result.data.allBooks)
    }
  }, [result])


  useSubscription(ADD_SUBSCRIPTION, {
    onData: ({ data }) => {
      console.log(data.data)
      setBooks(books.concat(data.data.bookAdded))
    },
  })

  if (result.loading) {
    return <p>Loading...</p>
  }

  if (genresResult.loading) {
    return <p>Loading genres</p>
  }

  const getUniqueGenres = (genres) => {
    let allGenres = []

    Object.values(genres.allBooks).forEach((genre) => {
      allGenres = allGenres.concat(genre.genres)
    })

    return [...new Set(allGenres)]
  }

  const allGenres = getUniqueGenres(genresResult.data)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {allGenres.map((a) => (
        <button onClick={(e) => setGenre(a)} key={a}>
          {a}
        </button>
      ))}

      <button onClick={() => setGenre(null)}>All genres</button>
    </div>
  )
}

export default Books
