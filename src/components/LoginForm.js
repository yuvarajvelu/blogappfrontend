import React, { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ login, notifyMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification id = 'message' message = {notifyMessage} />
      <form onSubmit = {handleLogin}>
        <div>
                Username
          <input type = 'text' id = 'username' value = {username} name = 'username' onChange = {({ target }) => {setUsername(target.value)}} />
        </div>
        <div>
                Password
          <input type = 'password' id = 'password' value = {password} name = 'password' onChange = {({ target }) => {setPassword(target.value)}} />
        </div>
        <button id = 'login' type = 'submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm