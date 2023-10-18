import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken =>  token = `Bearer ${newToken}`

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = ( data ) => {
  const config = { headers: { Authorization: token } }

  return axios.post(baseUrl, data, config)
  .catch( error => console.log(error) )
}

export default { getAll, setToken, create }