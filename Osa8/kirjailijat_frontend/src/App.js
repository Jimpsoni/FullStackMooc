import { useState } from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const linkStyle = { margin: 15 }
  
  return (
    <div>
      <div style={{marginBottom: 10}}>
        <Link style={linkStyle} to="/authors">Authors</Link>
        <Link style={linkStyle} to="/books">books</Link>
        <Link style={linkStyle} to="/create">Add new</Link>
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/create" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
