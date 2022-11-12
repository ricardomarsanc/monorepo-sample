import React, { useState } from 'react'
import { useUser } from '../hooks'
import { LoginForm } from '../components'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { user, login } = useUser()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      login(username, password)
      setUsername('')
      setPassword('')
      navigate('/notes')
    } catch (e) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>
  }

  if (user) {
    return <p>User is logged</p>
  }

  return (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={
        ({ target }) => setUsername(target.value)
      }
      handlePasswordChange={
        ({ target }) => setPassword(target.value)
      }
      handleSubmit={handleLogin}
    />
  )
}

export { Login }
