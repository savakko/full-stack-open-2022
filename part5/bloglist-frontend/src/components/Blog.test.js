import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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

  test('is initially rendered only with the title and author', () => {
    render(<Blog blog={blog} />)

    const titleElement  = screen.getByText(blog.title, { exact: false })
    const authorElement = screen.getByText(blog.author, { exact: false })
    expect(titleElement) .toBeDefined()
    expect(authorElement).toBeDefined()
    expect(titleElement) .toEqual(authorElement)

    const urlElement   = screen.queryByText(blog.url, { exact: false })
    const likesElement = screen.queryByText('likes', { exact: false })
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })

  test('renders the url and like count when the view-button is pressed', async () => {
    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const urlElement   = screen.getByText(blog.url, { exact: false })
    const likesElement = screen.getByText('likes', { exact: false })
    expect(urlElement)  .toBeDefined()
    expect(likesElement).toBeDefined()
  })

  test('handles the like-event correctly', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} />)

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
