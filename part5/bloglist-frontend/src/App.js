import './index.css'

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', style: 'success' })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, style) => {
    setNotification({ message, style: style || 'success' })
    setTimeout(() => setNotification({ message: '', style: 'success' }), 3000)
  }

  const loginUser = (userData) => {
    loginService.login(userData)
      .then(user => {
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        blogService.setToken(user.token)
        setUser(user)
        notify('login successful')
      })
      .catch (exception => notify(exception.response.data.error, 'error'))
  }

  const logoutUser = (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedUser')
    setUser(null)
    notify('logout successful')
  }

  const createBlog = (blog) => {
    blogService.create(blog)
      .then(createdBlog => {
        blogFormRef.current.toggleVisibility()

        const newBlog = {
          ...createdBlog,
          user: {
            id: createdBlog.user,
            username: user.username,
            name: user.name
          }
        }
        setBlogs(blogs.concat(newBlog))
        notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      })
      .catch(exception => notify(exception.response.data.error, 'error'))
  }

  const updateBlog = (id, blog) => {
    blogService.update(id, blog)
      .then((updatedBlog) => {
        const newBlogs = blogs.map(b => {
          if (b.id === updatedBlog.id)
            return { ...b, likes: updatedBlog.likes }
          return b
        })
        setBlogs(newBlogs)
        notify(`blog ${updatedBlog.title} by ${updatedBlog.author} updated`)
      })
      .catch(exception => notify(exception.response.data.error, 'error'))
  }

  const deleteBlog = (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      return

    blogService.remove(blog.id)
      .then(() => {
        const newBlogs = blogs.filter(b => b.id !== blog.id)
        setBlogs(newBlogs)
        notify(`blog ${blog.title} by ${blog.author} deleted`)
      })
      .catch(exception => notify(exception.response.data.error, 'error'))
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification notification={notification} />
      {user === null ?
        <Togglable buttonLabel='login'>
          <LoginForm loginUser={loginUser} />
        </Togglable> :
        <div>
          <p>
            {user.name} logged in {' '}
            <button type='submit' onClick={logoutUser}>logout</button>
          </p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      }
      <h2>Blogs</h2>
      {blogs
        // .filter(blog => blog.user?.username === user.username)
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={updateBlog}
            handleDelete={deleteBlog}
            owned={blog.user?.username === user?.username}
          />
        )
      }
    </div>
  )
}

export default App
