import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/loginService'
import './index.css'


const Message = ( {message} ) => {
  return <p className="message">{message}</p>
} 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  // Get blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Check login
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUser) {
      const cache = JSON.parse(loggedUser)
      setUser(cache)
      blogService.setToken(cache.token)
    }
  }, [])

  const addNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setAuthor(''); setTitle(''); setUrl('')
    blogService.create(newBlog)
    .then( returned => { setBlogs(blogs.concat(returned.data)) })
    .then( () => notification(`a new blog ${newBlog.title} by ${author} added`))
    .catch( () => notification(`Error occured`) )

    notification(`a new blog ${newBlog.title} by ${author} added`)
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedNoteappUser")
    location.reload()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    const loginCredentials = {
      username: username,
      password: password
    }

    try {
      const reqUser = await loginService.login(loginCredentials)

      setUser(reqUser)
      setUsername('')
      setPassword('')

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(reqUser)
      )

      blogService.setToken(reqUser.token)

    } catch {
      notification("Wrong credentials")
    }
  }

  const notification = ( message ) => {
    setMessage(message)
    setTimeout( () => {
      setMessage(null)
    }, 5000)
  }

  const addNewForm = () => (
    <form onSubmit={addNewBlog}>
      <div>title: <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}/></div>
      <div>author: <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/></div>
      <div>url: <input type="text" value={url} onChange={({ target }) => setUrl(target.value)}/></div>
      <button type="submit">Create</button>
    </form>
  )

  const loginForm = () => (
    <>
      {message && <Message message={message}/>}
      <form onSubmit={handleLogin}>
        <div>
          username:
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  if ( user === null ) return loginForm()

  return (
    <div>
      <h2>blogs</h2>
      
      {message && <Message message={message}/>}

      <div><span>{user.name} logged in  </span><button onClick={handleLogout}>Logout</button></div><br></br>
      
      <h2>Create new</h2>
      {addNewForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App