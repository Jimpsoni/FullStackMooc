import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LOGIN } from "../queries"
import { useMutation } from "@apollo/client"

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, result] = useMutation(LOGIN, {})
  const nav = useNavigate()

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("user-token", token)
      nav("/")
    }
  })

  const handleSubmit = () => {
    login({ variables: { username, password } })
    setPassword("")
    setUsername("")
  }

  return (
    <>
      <h2>Login</h2>
      <form>
        <div>
          username:{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
