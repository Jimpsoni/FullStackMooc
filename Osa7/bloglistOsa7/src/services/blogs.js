import axios from "axios"
import store from "../store"
const baseUrl = "http://localhost:3003/api/blogs"

const getToken = () => {
  return `Bearer ${store.getState().user}`
}
const getAll = () => axios.get(baseUrl).then((response) => response.data)

const create = (data) => {
  const config = { headers: { Authorization: getToken() } }
  return axios.post(baseUrl, data, config).catch((error) => console.log(error))
}

const update = (id, data) => axios.put(baseUrl + `/${id}`, data)

const remove = (id) => {
  const config = { headers: { Authorization: getToken() } }
  axios.delete(baseUrl + `/${id}`, config).catch((error) => console.log(error))
}

export default { getAll, create, update, remove }
