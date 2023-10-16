const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blogs')


const initialBlogs = [
    {
        title: "Hello World!",
        author: "Jimi Jukkala",
        url: "www.google.com",
        likes: 242
    },
    {
        title: "Coding is fun!",
        author: "Peppi",
        url: "www.yahoo.com",
        likes: 243
    },
]


beforeEach(async () => {
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})



describe("Test api methods at api/blogs", () => {

    test("Get method is working", async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test("blogs have id", async () => {
        const response = await api.get('/api/blogs')
        response.body.map( blog => expect(blog.id).toBeDefined() )
    })

    test("Post method is working", async () => {
        const request = {
            author: 'Jimi Jukkala',
            title: 'Testing is useful',
            url: 'www.bing.com',
            likes: 10
        }

        await api.post('/api/blogs').send(request)
        const response = await api.get('/api/blogs')
        
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(response.body.map(r => r.title)).toContain( 'Testing is useful' )

    })

})



afterAll(async () => {
    await mongoose.connection.close()
  })
