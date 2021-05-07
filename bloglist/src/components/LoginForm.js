import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { logInUser } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logInUser(username, password))
    .catch(error => {
      dispatch(showNotification('Wrong username or password', 'danger', 3))
    })
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button variant="primary" type="submit">login</Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
