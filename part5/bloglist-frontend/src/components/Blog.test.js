import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('a blog is rendered', () => {
  const blog = {
    title: 'Esimerkkiblogi',
    author: 'Erkki',
    url: 'localhost:9999',
    likes: 2,
    user: {
      username: 'erkkijumala',
      name: 'Erkki Esimerkki'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(`${blog.title} ${blog.author}`)
  screen.debug(element)
})

test('clicking like calls the event handler once', async () => {
  const blog = {
    title: 'Esimerkkiblogi',
    author: 'Erkki',
    url: 'localhost:9999',
    likes: 2,
    user: {
      username: 'erkkijumala',
      name: 'Erkki Esimerkki'
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog
      blog={blog}
      handleLike={mockHandler}
      handleDelete={mockHandler}
      owned={true}
    />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
