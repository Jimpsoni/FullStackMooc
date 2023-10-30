import { useState, useEffect, useRef } from "react"
import BlogList from "./components/BlogList"
import AddNewForm from "./components/AddNewForm"
import blogService from "./services/blogs"
import loginService from "./services/loginService"
import LoginForm from "./components/LoginForm"
import "./index.css"
import Togglable from "./components/Togglable"

// Notification
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from "./reducers/notificationReducer"
import { giveToken } from "./reducers/userReducer"

// Blogs
import { initialBlogs, setBlogs, addBlog } from "./reducers/blogReducer"

const Message = ({ message }) => {
  return <p className="message">{message.payload}</p>
}

const App = () => {
  const [user, setUser] = useState(null)
  const addNewBlogRef = useRef()

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



  if (user === null) return <LoginForm setUser={setUser}/>
  return (
    <div>
      <h2>blogs</h2>

      {message && <Message message={message} />}

      <div>
        <span>{user.name} logged in </span>
        <button id="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <br></br>

      <h2>Create new</h2>
      <Togglable buttonLabel="Add new blog" ref={addNewBlogRef}>
        <AddNewForm createBlog={addNewBlog} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )
}

export default App
