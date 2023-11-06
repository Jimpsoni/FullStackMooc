import { useQuery } from "@apollo/client"
import { ALL_BOOKS, GET_USER_GENRE } from "../queries"
import { useEffect, useState } from "react"

const Recommendations = () => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(GET_USER_GENRE)
  const booksQuery = useQuery(ALL_BOOKS, { variables: { genre } })

  useEffect(() => {
    if (!result.loading) {
      setGenre(result.data.me.favoriteGenre)
    }
  }, [result])

  if (result.loading || booksQuery.loading) {
    return <p>Loading recommendations</p>
  }

  const books = booksQuery.data.allBooks

  return (
    <>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <b>{genre}</b>
      </p>
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
    </>
  )
}

export default Recommendations
