const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Esimerkkiblogi',
    author: 'Erkki Esimerkki',
    url: 'esimerkkiurl.com',
    likes: 21
  },
  {
    title: 'Mars mars',
    author: 'Matti Meikäläinen',
    url: 'yykaakoo.fi',
    likes: 14
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'no one',
    url: 'nonexistent.org',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}