import { useState } from "react"

const Blog = ({blog}) => {
  const [infoVisible, setInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleInfo = (event) => {
    setInfoVisible(!infoVisible)
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
          <div>{blog.likes}</div>
          <div>{blog.user?.name}</div>
        </div>
      }
    </div>
  )
}

export default Blog
