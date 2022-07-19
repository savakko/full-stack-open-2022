const cors = require('cors')
const express = require('express')
const app = express()
const blogRouter = require('./controllers/blogs')
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

app.use(middleware.errorHandler)

module.exports = app
