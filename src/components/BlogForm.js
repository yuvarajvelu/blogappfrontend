import React , { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createnewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createnewBlog({
      title : title,
      author : author,
      url : url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit = {addBlog}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <Form.Control type ='text' id = 'title' value = {title} name = 'title' onChange = {({ target }) => {setTitle(target.value)}} />
          </div>
          <div>
            <Form.Label>author:</Form.Label>
            <Form.Control type = 'text' id = 'author' value = {author} name = 'author' onChange = {({ target }) => {setAuthor(target.value)}} />
          </div>
          <div>
            <Form.Label>url:</Form.Label>
            <Form.Control type = 'text' id = 'url' value = {url} name = 'url' onChange = {({ target }) => {setUrl(target.value)}} />
          </div>
          <Button variant = 'primary' id = 'submitBlog' type = 'submit'>create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm