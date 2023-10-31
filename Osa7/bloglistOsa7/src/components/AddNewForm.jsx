import { useState } from "react"

const AddNewForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })

    setAuthor("")
    setTitle("")
    setUrl("")
  }

  return (
    <form data-testid="blogform" onSubmit={addBlog}>
      <div>
        title:{" "}
        <input
          id="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          id="author"
          type="text"
          placeholder="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          id="url"
          type="text"
          placeholder="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="submit-button" type="submit">
        Create
      </button>
    </form>
  )
}

export default AddNewForm
