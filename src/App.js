import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notifyMessage, setNotifyMessage] = useState(null)

  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    }
    )
  }, [])
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem( 'loggedBlogappUser' )
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async loginObject => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user) )
      blogService.setToken(user.token)
      setUser(user)
    } catch (e) {
      setNotifyMessage('Wrong Credentials')
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setNotifyMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} is added `)
    setTimeout(() => {
      setNotifyMessage(null)
    },5000)
    setBlogs(blogs.concat(returnedBlog))
  }

  const handleLike = async blogObject => {
    const returnedBlog = await blogService.change(blogObject)
    setBlogs(blogs.map(blog => blog.id === blogObject.id ? returnedBlog : blog))
  }

  const handleDelete = async blogObject => {
    await blogService.remove(blogObject)
    setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
  }

  const blogForm = () => (
    <Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
      <BlogForm createnewBlog = {addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <Togglable buttonLabel = 'login'>
      <LoginForm  login = {handleLogin} notifyMessage = {notifyMessage} />
    </Togglable>
  )

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <h2>Blog App</h2>
      { user === null && loginForm() }
      { user !== null && <div>
        <Notification message = { notifyMessage } />
        <p>{user.name} logged in</p>
        <button type = 'submit' id = 'logout' onClick = {handleLogout}>Logout</button>
        {blogForm()}
        {blogs.sort(byLikes).map(blog => (
          <Blog key={blog.id} blog={blog} userId = {user.id} increaseLike = {handleLike} handleDelete = {handleDelete} />
        ))}
      </div>}
    </div>
  )
}

export default App