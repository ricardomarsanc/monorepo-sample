import axios from 'axios'
// FIXME: I'm using the URL to the local API environment, but this should be in a .env file or something to switch between local and DEV/PROD
// before (Check Login Service to see why): const baseUrl = 'http://localhost:3001/api/notes'
const baseUrl = '/api/notes'

let token = null

/**
 * Set new auth token
 * @param {string} newToken
 */
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

/**
 * Set headers configuration for different requests
 * @param {string} token
 * @returns Configuration object for the request
 */
const setConfig = token => {
  return {
    headers: {
      Authorization: token
    }
  }
}

/**
 * Get all notes
 * @returns Notes list
 */
const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

/**
 * Create New Note
 * @param {Note} newObject
 * @returns New note created
 */
const create = async (newObject) => {
  const config = setConfig(token)

  const { data } = await axios.post(baseUrl, newObject, config)
  return data
}

/**
 * Update an existing Note
 * @param {string} id ID of the note to edit
 * @param {Note} newObject Body with the changes (Partial)
 * @returns Edited note
 */
const update = async (id, newObject) => {
  const config = setConfig(token)

  const { data } = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return data
}

export { getAll, create, update, setToken }
