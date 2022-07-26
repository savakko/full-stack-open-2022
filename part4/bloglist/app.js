const cors = require('cors')
const express = require('express')
require('express-async-errors')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')
const mongoose = require('mongoose')

logger.info('connecting to database...')

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('database connection successful'))
  .catch(error => logger.error('database connection failed:', error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
