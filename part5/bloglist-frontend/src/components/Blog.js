import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleInfo = (event) => {
    event.preventDefault()
    setInfoVisible(!infoVisible)
  }

  const addLike = (event) => {
    event.preventDefault()

    handleLike(blog.id, {
      ...blog,
      user: blog.user?.id,
      likes: blog.likes + 1
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()

    handleDelete(blog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} {' '}
      <button type='submit' onClick={toggleInfo}>
        {!infoVisible ? 'view' : 'hide'}
      </button>
      {infoVisible &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} {' '}
            <button type='submit' onClick={addLike}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          <button type='submit' onClick={deleteBlog}>remove</button>
        </div>
      }
    </div>
  )
}

export default Blog
