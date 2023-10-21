import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AddNewForm from '../src/components/AddNewForm'
import userEvent from '@testing-library/user-event'

let mockHandler = jest.fn()
beforeEach(() => {
  render(<AddNewForm createBlog={mockHandler}/>)
})

test('Blogform calls the function with right parameters', async () => {
  const user = userEvent.setup()

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('Create')

  await user.type(title, 'testing a form')
  await user.type(author, 'hello world')
  await user.type(url, 'google')
  await user.click(sendButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing a form')
  expect(mockHandler.mock.calls[0][0].author).toBe('hello world')
  expect(mockHandler.mock.calls[0][0].url).toBe('google')
})