import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => {
  return axios.post("http://localhost:3001/persons", person)
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
}

const update = ( newPerson, number ) => { 
  console.log(newPerson)
  const newData = {...newPerson, number:number }
  return axios.put(baseUrl + `/${newPerson.id}`, newData)
 }

const deleteItem = ( id ) => { 
  return axios.delete(baseUrl + `/${id}`) 
}

export default {getAll, create, update, deleteItem}
