import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test.only('<BlogForm /> calls the parent event handler with right details',() => {
  const createNewBlog = jest.fn()

  const component = render(
    <BlogForm createnewBlog = {createNewBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(titleInput, {
    target: { value: 'New' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Publisher' }
  })
  fireEvent.change(urlInput, {
    target: { value: 'newblog.com' }
  })

  fireEvent.submit(form)
  expect(createNewBlog.mock.calls).toHaveLength(1)
  expect(createNewBlog.mock.calls[0][0].title).toBe('New')
  expect(createNewBlog.mock.calls[0][0].author).toBe('Publisher')
  expect(createNewBlog.mock.calls[0][0].url).toBe('newblog.com')
})