import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Form , Button } from 'react-bootstrap'

const Blog = ({ blogs, increaseLike, handleDelete, includeComment }) => {
  const user = useSelector(state => state.user)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const handleLike = (event) => {
    event.preventDefault()
    increaseLike({
      ...blog,
      likes : blog.likes + 1
    })
  }
  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    includeComment(comment, blog.id)
    event.target.comment.value = ''
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }
  if(!blog) {
    return null
  }
  const blogUserId = blog.user.id || blog.user
  return (
    <div>
      <div>
        <h1>{blog.title}</h1>
        <a href = {blog.url}>{blog.url}</a>
        <p><span className = 'likes'>{blog.likes}</span><button className = 'like' onClick = {handleLike}>like</button></p>
        <p>{blog.author}</p>
        {user.id === blogUserId && <Button variant = 'danger' id = 'remove' onClick = {deleteBlog}>delete</Button>}
        <h3>comments</h3>
        <Form onSubmit = {handleComment}>
          <Form.Control name = 'comment' type = 'text' />
          <Button variant = 'primary' type = 'submit'>add comment</Button>
        </Form>
        {blog.comments.length !== 0 && 
          <ul>
            {blog.comments.map(comment => <li key = {comment}>{comment}</li>)}
          </ul>}
      </div>
    </div>
  )
}

export default Blog
