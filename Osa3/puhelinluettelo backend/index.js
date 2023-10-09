// määritellään express
const express = require('express')
const app = express()


// Määritellään yhteystiedot
let persons = { 
    "persons": [
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
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
