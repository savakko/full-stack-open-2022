import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => {
  return { headers: { Authorization: token } }
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const blogService = {
  getAll,
  create,
  update,
  remove,
  setToken
}
export default blogService
