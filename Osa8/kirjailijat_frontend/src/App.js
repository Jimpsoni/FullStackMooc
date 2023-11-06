// Hooks
import { useState, useEffect } from "react"

// Components
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginButton from "./components/LoginButton"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

// React Router
import { Routes, Route, Link } from "react-router-dom"


const App = () => {
  const [token, setToken] = useState(null)
  const linkStyle = { marginRight: 15 }

  useEffect(() => {
    const token = localStorage.getItem("user-token")
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Link style={linkStyle} to="/authors">
          <button>Authors</button>
        </Link>
        <Link style={linkStyle} to="/">
          <button>Books</button>
        </Link>

        {token && (
          <>
            <Link style={linkStyle} to="/create">
              <button>Add new</button>
            </Link>

            <Link style={linkStyle} to="/recommend">
              <button>Recommend</button>
            </Link>
          </>
        )}

        <LoginButton setToken={setToken} token={token} />
      </div>

      <Routes>
        <Route path={"/authors"} element={<Authors token={token} />} />
        <Route path="/" element={<Books />} />
        <Route path="/create" element={<NewBook />} />
        <Route path="/recommend" element={<Recommendations/>}/>
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
      </Routes>
    </div>
  )
}

export default App
