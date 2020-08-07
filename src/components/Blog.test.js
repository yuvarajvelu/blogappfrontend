import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />',() => {
  let component
  const blog = {
    title: 'New Blog',
    author: 'person',
    url: 'blog.com',
    user: {
      id: 99
    }
  }
  beforeEach(() => {
    component = render(
      <Blog blog = {blog} />
    )
  })
  test('initially renders title and author not url and likes',() => {

    const initial = component.container.querySelector('.initialContent')
    const toggled = component.container.querySelector('.togglableContent')

    expect(initial).not.toHaveStyle('display: none')
    expect(toggled).toHaveStyle('display: none')
  })

  test('after clicking the button all the childrens are displayed',() => {
    const element = component.container.querySelector('.togglableContent')
    expect(element).toHaveStyle('display: none')
    const button = component.getByText('View')
    fireEvent.click(button)
    expect(element).not.toHaveStyle('display: none')
  })

  test('Event handler is called twice if the like is clicked twice',() => {
    const increaseLike = jest.fn()

    component = render(
      <Blog increaseLike = {increaseLike} blog = {blog} />
    )

    const button = component.container.querySelector('.like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(increaseLike.mock.calls).toHaveLength(2)
  })
})