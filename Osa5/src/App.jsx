import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import AddNewForm from './components/AddNewForm'
import blogService from './services/blogs'
import loginService from './services/loginService'
import './index.css'
import Togglable from './components/Togglable'


const Message = ({ message }) => {
  return <p className="message">{message}</p>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const addNewBlogRef = useRef()

  const [message, setMessage] = useState(null)

  // Get blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Check login
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const cache = JSON.parse(loggedUser)
      setUser(cache)
      blogService.setToken(cache.token)
    }
  }, [])

  const addNewBlog = ( newBlog ) => {
    addNewBlogRef.current.toggleVisibility()
    blogService.create(newBlog)
      .then( returned => { setBlogs(blogs.concat(returned.data)) })
      .then( () => notification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
      .catch( () => notification('Error occured') )

    notification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  const removeBlog = ( ref ) => {
    setBlogs(blogs.filter(blog => blog.id !== ref.id))
    notification(`Deleted ${ref.title} by ${ref.author}`)
  }
  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedBlogAppUser')
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
        'loggedBlogAppUser', JSON.stringify(reqUser)
      )

      blogService.setToken(reqUser.token)

    } catch {
      notification('Wrong credentials')
    }
  }

  const notification = ( message ) => {
    setMessage(message)
    setTimeout( () => {
      setMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <>
      {message && <Message message={message}/>}
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type='text'
            id='username'
            value={username}
            name='Username'
            placeholder='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            id='password'
            value={password}
            placeholder='Password'
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </>
  )


  if ( user === null ) return loginForm()
  return (
    <div>
      <h2>blogs</h2>

      {message && <Message message={message}/>}

      <div><span>{user.name} logged in  </span><button id='logoutButton' onClick={handleLogout}>Logout</button></div><br></br>

      <h2>Create new</h2>
      <Togglable buttonLabel="Add new blog" ref={addNewBlogRef}>
        <AddNewForm
          createBlog={addNewBlog}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} removeBlog={removeBlog} />
      )}
    </div>
  )
}

export default App