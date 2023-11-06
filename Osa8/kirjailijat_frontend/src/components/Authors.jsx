import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, UPDATE_BIRTHYEAR } from "../queries"
import { useEffect, useState } from "react"

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS)
  const [changeBirthyear] = useMutation(UPDATE_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const [selectedName, setSelectedName] = useState()
  const [born, setBorn] = useState("")

  if (result.loading) {
    return <p>Loading...</p>
  }

  const authors = result.data.allAuthors

  const submitBirthyear = (event) => {
    event.preventDefault()
    let name
    if (selectedName == undefined) name = authors[0].name
    else name = selectedName

    changeBirthyear({
      variables: { name, setBornTo: parseInt(born) },
    })

    setBorn("")
  }

  const handleChange = (e) => {
    setSelectedName(e.target.value)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token && (
        <>
          <h2>Set Birthyear</h2>
          <form onSubmit={submitBirthyear}>
            <div>
              name:{" "}
              <select value={selectedName} onChange={handleChange}>
                {authors.map((a) => (
                  <option key={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              birthyear:{" "}
              <input
                type="digit"
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </div>
            <button type="submit">Update Author</button>
          </form>
        </>
      )}
    </div>
  )
}

export default Authors
