const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require("../models/blogs")
const userExtractor = require('../utils/middleware').userExtractor


blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })
  

blogRouter.post('/', userExtractor, (request, response) => {
  const body = request.body
  const user = request.user

  const newBlog = {
    ...body,
    user: user.id
  }
  
  const blog = new Blog(newBlog)
  blog
    .save()
    .then(result => { response.status(201).json(result) })
    .catch(error => { if (error.name === 'ValidationError') response.status(400).json({ error: error.message }) })
  })


blogRouter.delete('/:id', userExtractor, async (request, response) => {
  let blog
  try {
    blog = await Blog.findById(request.params.id)
    } 
  catch { 
    return response.status(400).end() 
  }

  if ( blog.user.toString() === request.user.id.toString() ) {
    try {
      const response = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch {
      response.status(500).end()
    }
  } else {
    response.status(401).end()
  }



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