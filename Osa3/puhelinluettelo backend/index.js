// määritellään express
const express = require('express')
const app = express()


// Määritellään yhteystiedot
let persons = [
      {
        "name": "Arto Hellas",
        "number": "321",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "Peppi",
        "number": "123",
        "id": 5
      }
]

// Määritellään API kutsut
app.get('/api/persons', (req, res) => { res.json(persons) })

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id) // Etsitään ID

    if(person == undefined) {res.status(404).end()}
    else { res.json(person) }
})

app.get('/info', (req, res) => {
    const message = `Phonebook has info for ${persons.length} people`
    const time = new Date();
    console.log(time)
    res.send(`<p> ${message}</p> <p> ${time}</p>`)


}) 



// Käynnistetään serveri
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
