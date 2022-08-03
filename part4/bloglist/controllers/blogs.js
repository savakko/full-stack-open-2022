const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { user, body } = request

  body.user = user._id
  const blog = new Blog(body)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog)
    return response.status(404).end()
  response.json(blog)
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  response.json(blog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.user.blogs.includes(request.params.id))
    return response.status(401).json({ error: 'Permission denied' })

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
