import React , { useState } from 'react'

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
      <form onSubmit = {addBlog}>
        <div>title:<input type ='text' id = 'title' value = {title} name = 'title' onChange = {({ target }) => {setTitle(target.value)}} /></div>
        <div>author:<input type = 'text' id = 'author' value = {author} name = 'author' onChange = {({ target }) => {setAuthor(target.value)}} /></div>
        <div>url:<input type = 'text' id = 'url' value = {url} name = 'url' onChange = {({ target }) => {setUrl(target.value)}} /></div>
        <button id = 'submitBlog' type = 'submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm