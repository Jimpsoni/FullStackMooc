import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => axios.post("http://localhost:3001/persons", person)

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
}

const update = ( newPerson, number ) => { 
  const newData = {...newPerson, number:number }
  axios.put(baseUrl + `/${newPerson.id}`, newData)
 }

const deleteItem = ( id ) => { axios.delete(baseUrl + `/${id}`) }

export default {getAll, create, update, deleteItem}
