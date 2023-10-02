import { useState } from 'react'

const Part = ({ name }) => {
  return <p>{name}</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }

    
    /* TODO jos on olemassa nimi jo */
    alert(`${newName} is already added to phonebook`)
    
    /* Muulloin sitten tama */
    setNewName('')
    setPersons(persons.concat(personObject))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Part key={person.name} name={person.name} />
      )}

    </div>
  )

}

export default App
