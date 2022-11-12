import { useEffect, useState } from 'react'
import { setToken, login as userLogin } from '../services'

const useUser = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    const user = await userLogin({
      username,
      password
    })

    window.localStorage.setItem(
      'loggedNoteAppUser', JSON.stringify(user)
    )

    setToken(user.token)

    setUser(user)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  return { user, login, logout }
}

export { useUser }
