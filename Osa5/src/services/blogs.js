import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken =>  token = `Bearer ${newToken}`

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = ( data ) => {
  const config = { headers: { Authorization: token } }

  return axios.post(baseUrl, data, config)
    .catch( error => console.log(error) )
}

const update = ( id, data ) => axios.put(baseUrl + `/${id}`, data)

const remove = ( id ) => {
  const config = { headers: { Authorization: token } }
  axios.delete(baseUrl + `/${id}`, config)
    .catch(error => console.log(error))
}

export default { getAll, setToken, create, update, remove }