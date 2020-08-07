import React, { useState } from 'react'
const Blog = ({ blog, increaseLike, handleDelete , userId }) => {
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display : view ? 'none' : '' }
  const showWhenVisible = { display : view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  const handleLike = (event) => {
    event.preventDefault()
    increaseLike({
      ...blog,
      likes : blog.likes + 1
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  const blogUserId = blog.user.id || blog.user

  return (
    <div style = {blogStyle} className = 'initialContent'>
      <div style = {hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick = {toggleView}>View</button></p>
      </div>
      <div style = {showWhenVisible} className = 'togglableContent'>
        <p>{blog.title}<button onClick = {toggleView}>Hide</button></p>
        <p>{blog.url}</p>
        <p><span className = 'likes'>{blog.likes}</span><button className = 'like' onClick = {handleLike}>like</button></p>
        <p>{blog.author}</p>
        {userId === blogUserId && <button id = 'remove'  style = { { backgroundColor: 'blue' } } onClick = {deleteBlog}>delete</button>}
      </div>
    </div>
  )
}

export default Blog
