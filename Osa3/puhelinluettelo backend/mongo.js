const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Error, give atleast password as argument')
    process.exit(1)
} 

const password = process.argv[2]

const url = `mongodb+srv://jukkalajimi:${password}@fullstackmooc.55el1wl.mongodb.net/Puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    }
)

const Person = mongoose.model('Person', personSchema)


if (process.argv.length == 3) {
    console.log("Phonebook: ")
    Person.find({}).then(result => {
        result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
}


if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log(`Added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}