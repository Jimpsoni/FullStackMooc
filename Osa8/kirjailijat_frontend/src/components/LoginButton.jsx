import { Link } from "react-router-dom"
import { useApolloClient } from "@apollo/client"

const LoginButton = ({ setToken, token }) => {
  const client = useApolloClient()
  if (!token)
    return (
      <Link to={"/login"}>
        <button>Login</button>
      </Link>
    )

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return <button onClick={handleLogout}>Logout</button>
}

export default LoginButton
