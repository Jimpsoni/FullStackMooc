const config = require('./utils/config')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const express = require('express')

const app = express()
const cors = require('cors')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use('/api/blogs', blogRouter)


module.exports = app