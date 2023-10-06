import { useState, useEffect } from 'react'
import service from './services/services'

/* REACT KOMPONENTIT */

const Part = ({ name, number }) => <p>{name}, {number}</p>
const Filter = ({filter, handleFilterChange}) => <div> filter shown with: <input value={filter} onChange={handleFilterChange}/></div>
const Persons = ({persons}) => persons.map(person => <Part key={person.name} name={person.name} number={person.number} />)
const PersonForm = ({onSubmit, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={onSubmit}>
    <div> name: <input value={newName} onChange={handleNameChange} /></div>
    <div> number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const App = () => {
  /* Hooks */

  useEffect(() => {
    service
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  
  /* Filtteri */
  const namesToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  /* Event handlers */
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  /* The function we execute when we submit the form */
  const addName = (event) => {
    event.preventDefault()
    let doesntExist = true
    persons.forEach((person) => { if (newName == person.name) { doesntExist = false; return } } )
    
    if (doesntExist) {
      const personObject = { name: newName, number: newNumber }
    
      service.create(personObject)
      setPersons(persons.concat(personObject))

      } else { alert(`${newName} is already added to phonebook`) }
    
    setNewName('')
    setNewNumber('')
 }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} value={filter}/>

      <h2>add a new</h2>
      <PersonForm onSubmit={addName}  handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} 
       newName={newName} newNumber={newNumber}/>
      
      <h2>Numbers</h2>
      <Persons persons={namesToShow}/>
    </div>
  )

}

export default App
