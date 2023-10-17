const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require("../models/blogs")


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  

blogRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => { response.status(201).json(result) })
      .catch(error => { if (error.name === 'ValidationError') response.status(400).json({ error: error.message }) })
      
  })


blogRouter.delete('/:id', (request, response) => {
  Blog.findByIdAndRemove(request.params.id)
  .then( () => response.status(204).end() )
  .catch( () => response.status(400).end() )
})


blogRouter.put('/:id', (request, response) => {
  const likes  = request.body.likes
  
  Blog.findByIdAndUpdate(request.params.id, {likes: likes}, { 
    new: false,
    runValidators: true,
    context: 'query'
  })
  .then( updatedBlog => response.json(updatedBlog) )
  .catch( () => response.status(400).end() )
})

module.exports = blogRouter