import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'

let blog = {
  title: 'Testing the frontend',
  author: 'Jimi Jukkala',
  url: 'www.nettisivu.fi',
  likes: 16,
  user: {
    username: 'Jimi',
    name: 'Jimi'
  }
}

beforeEach(() => {
  render(<Blog blog={blog} username='Jimi' removeBlog={() => {}}/>)
})


test('renders a title for Blog component', () => {
  screen.getByText('Testing the frontend Jimi Jukkala')
})

test('does not render url or likes', async () => {
  const element = await screen.findByTestId('moreInfo')
  expect(element).toHaveStyle('display: none')
})

test('Show url, likes and user when clicked show', async () => {
  const user = userEvent.setup()
  const button = screen.getByText('View')

  await user.click(button)

  const element = await screen.findByTestId('moreInfo')
  expect(element).toHaveStyle('display: block')

})

test('Like button works', async () => {
  const user = userEvent.setup()
  const showButton = screen.getByText('View')
  await user.click(showButton)
  const likeButton = screen.getByText('Like')

  const mockHandler = jest.fn()

  likeButton.onclick = mockHandler

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toBeCalledTimes(2)

})
