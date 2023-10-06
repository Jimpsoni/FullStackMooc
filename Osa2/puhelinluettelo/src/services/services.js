import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => axios.post("http://localhost:3001/persons", person)

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
  }


export default {getAll, create}
