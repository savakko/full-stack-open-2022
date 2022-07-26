const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // Version using Promise.all(<iterable>) --->
  // const blogObjects = helper.initialBlogs.map(b => new Blog(b))
  // const promiseArray = blogObjects.map(b => b.save())
  // await Promise.all(promiseArray)
  // <---
})

describe('reading the blog database', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog identifiers should be named id', async () => {
    const response = await api.get('/api/blogs')
    const first = response.body[0]

    expect(first).toBeDefined()
    expect(first.id).toBeDefined()
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)

    expect(titles).toContain('Esimerkkiblogi')
  })

  test('a specific blog can be viewed separately', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))
    expect(resultBlog.body).toEqual(processedBlogToView)
  })
})

describe('changing the state of the blog database', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Matti Luukkainen',
      url: 'fullstackopen.com',
      likes: 9000
    }

    const user = await helper.loginRootUser(api)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('async/await simplifies making async calls')
  })

  test('a blog sent without an authorization token is not added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Matti Luukkainen',
      url: 'fullstackopen.com',
      likes: 9000
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog without a title or url is not added', async () => {
    const newBlog = {
      author: 'Matti Luukkainen',
      url: 'fullstackopen.com',
      likes: 9000
    }
    const newBlog2 = {
      title: 'async/await simplifies making async calls',
      author: 'Matti Luukkainen',
      likes: 9000
    }

    const user = await helper.loginRootUser(api)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(400)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog2)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog without a like count is added with the default value of zero', async () => {
    const newBlog = {
      title: 'Erkin blogi',
      author: 'Erkki Esimerkki',
      url: 'esimerkkiurl2.com'
    }

    const user = await helper.loginRootUser(api)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

    expect(lastBlog.title).toEqual('Erkin blogi')
    expect(lastBlog.likes).toEqual(0)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'Eeppinen esimerkkiblogi',
      author: "Erkki Esimerkki",
      url: "esimerkkiurl.com",
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toEqual(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('Eeppinen esimerkkiblogi')
  })

  test('an added blog can be deleted', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Matti Luukkainen',
      url: 'fullstackopen.com',
      likes: 9000
    }

    const user = await helper.loginRootUser(api)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${user.token}`)
      .send(newBlog)
      .expect(201)

    const blogsAfterAdd = await helper.blogsInDb()
    const blogToDelete = blogsAfterAdd
      .find(b => b.title === newBlog.title)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAfterAdd.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
