import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a blog</h2>

      <form onSubmit={addBlog}>
        <div>
          Title: <input
            id='blog-title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: <input
            id='blog-author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url: <input
            id='blog-url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='submit-new-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
