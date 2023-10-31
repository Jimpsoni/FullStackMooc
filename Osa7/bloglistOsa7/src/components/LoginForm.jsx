import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"

import loginService from "../services/loginService"
import { setNotification } from "../reducers/notificationReducer"
import { giveToken } from "../reducers/userReducer"

const Message = ({ message }) => <p className="message">{message.payload}</p>

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const message = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  const resetForm = () => {
    setUsername("")
    setPassword("")
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    const loginCredentials = {
      username: username,
      password: password,
    }

    try {
      const reqUser = await loginService.login(loginCredentials)
      dispatch(giveToken(reqUser.token))
      resetForm()
      setUser(reqUser)
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(reqUser))
    } catch (e) {
      dispatch(setNotification("Wrong credentials"))
      console.log(e)
    }
  }

  const center = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "15%"
  }

  return (
    <div style={center}>
      {message && <Message message={message} />}
      <form onSubmit={handleLogin} >
        <div>
          username:
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm