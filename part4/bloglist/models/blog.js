const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Blog', blogSchema)
