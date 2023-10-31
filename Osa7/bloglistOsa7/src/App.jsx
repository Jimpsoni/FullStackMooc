import { useState, useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import AddNewForm from "./components/AddNewForm"
import LoginForm from "./components/LoginForm"
import "./index.css"
import Togglable from "./components/Togglable"


import { Routes, Route, useMatch, Link } from "react-router-dom"

// Notification
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { giveToken } from "./reducers/userReducer"

// Blogs
import { initialBlogs, setBlogs, addBlog } from "./reducers/blogReducer"
import Blog from "./components/Blog"

const Message = ({ message }) => {
  return <p className="message">{message.payload}</p>
}

const App = () => {
  const [user, setUser] = useState(null)
  const addNewBlogRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  const match = useMatch("/blogs/:id")
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const message = useSelector((state) => state.notification)

  // Get blogs
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initialBlogs())
  }, [])

  // Check login
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUser) {
      const cache = JSON.parse(loggedUser)
      setUser(cache)
      dispatch(giveToken(cache.token))
    }
  }, [])

  const addNewBlog = (newBlog) => {
    addNewBlogRef.current.toggleVisibility()
    try {
      dispatch(addBlog(newBlog))
      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      )
    } catch (e) {
      console.log(e)
      dispatch(setNotification("Error occured"))
    }
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem("loggedBlogAppUser")
    location.reload()
  }

  const navbarStyle = {
    background: "#B4BFC3",
    padding: 5,
  }

  const navbarItem = {
    margin: 5,
  }

  const Home = () => (
    <div>
      <Togglable buttonLabel="Add new blog" ref={addNewBlogRef}>
        <h2>Create new</h2>
        <AddNewForm createBlog={addNewBlog} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )

  if (user === null) return <LoginForm setUser={setUser} />
  return (
    <div className="container">
      <nav style={navbarStyle}>
        <Link style={navbarItem} to="/">
          Blogs
        </Link>
        <Link style={navbarItem} to="/users">
          Users
        </Link>
        <span style={navbarItem}>
          <span>{user.name} logged in </span>
          <button id="logoutButton" onClick={handleLogout}>
            Logout
          </button>
        </span>
      </nav>

      <h2 style={{marginTop: 25}}>blog App</h2>
      {message && <Message message={message} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
