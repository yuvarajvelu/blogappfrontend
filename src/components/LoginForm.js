import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ login, notifyMessage }) => {
  
  const handleLogin = (event) => {
    event.preventDefault()
    login({
      username: event.target.username.value,
      password: event.target.password.value
    })
    event.target.username.value = ''
    event.target.password.value = ''
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification id = 'message' message = {notifyMessage} />
      <Form onSubmit = {handleLogin}>
        <Form.Group>
        <div>
          <Form.Label>Username</Form.Label>
          <Form.Control type = 'text' id = 'username' name = 'username' />
        </div>
        <div>
          <Form.Label>Password</Form.Label>     
          <Form.Control type = 'password' id = 'password' name = 'password' />
        </div>
        <Button variant = 'primary' id = 'login' type = 'submit'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm