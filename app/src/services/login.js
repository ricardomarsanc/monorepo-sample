import axios from 'axios'

// Using a relative path because when using a monorepo we want the API to run the APP,
// and that allow us to use relative paths instead
// before: const baseUrl = 'http://localhost:3001/api/login'
const baseUrl = '/api/login'

/**
 * Login request
 * @param {string, string} credentials Username and Password
 * @returns Logged in user data (Incl. token, user_id and username)
 */
const login = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export { login }
