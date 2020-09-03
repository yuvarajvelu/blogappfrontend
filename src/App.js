import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { useSelector, useDispatch } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { loginUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch, Link, Route, useParams, Redirect
} from 'react-router-dom'
import { Table, Button, Navbar, Nav, ListGroup } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])
  
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem( 'loggedBlogappUser' )
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      dispatch(loginUser(user))
      blogService.setToken(user.token)
    }
  },[dispatch])
  const blogs = useSelector(state => state.blogs)
  const notifyMessage = useSelector(state => state.notify)
  const user = useSelector(state => state.user)

  const handleLogin = async loginObject => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem( 'loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(notify(`Welcome ${user.name}`))
      dispatch(loginUser(user))
    } catch (e) {
      dispatch(notify('Wrong Credentials'))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(loginUser(null))
  }

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(notify(`a new blog ${blogObject.title} by ${blogObject.author} is added `))
  }

  const handleLike = async blogObject => {
    const returnedBlog = await blogService.change(blogObject)
    dispatch(initializeBlogs(blogs.map(blog => blog.id === blogObject.id ? returnedBlog : blog)))
  }

  const handleDelete = async blogObject => {
    await blogService.remove(blogObject)
    dispatch(initializeBlogs(blogs.filter(blog => blog.id !== blogObject.id)))
  }

  const handleComment = async (comment, id) => {
    const returnedBlog = await blogService.addComment(comment, id)
    dispatch(initializeBlogs(blogs.map(blog => blog.id === id ? returnedBlog : blog)))
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
  
  const noOfBlogsByAuthor = (authorName) => {
    const result = blogs.reduce((total, blog) => {
      if(blog.user.name === authorName) {
        total += 1
      }
      return total
    },0)
    return result
  }

  
  
  const Home = () => {
    return (
      <div className = 'container'>
        { user === null && loginForm() }
        { user !== null && <div>
          <Notification message = { notifyMessage } />
          {blogForm()}
          {blogs.sort(byLikes).map(blog => (
            <Link key = {blog.id} to = {`/blogs/${blog.id}`}><ListGroup><ListGroup.Item variant="dark">{blog.title} {blog.author}</ListGroup.Item></ListGroup></Link>
          ))}
        </div>}
      </div>
    )
  }

  const User = () => {
    const id = useParams().id
    const blogsByUser = blogs.filter(blog => blog.user.id === id)
    if(blogsByUser.length === 0) {
      return null
    }
    const userName = blogsByUser[0].user.name
    return (
      <div>
        <h2>{userName}</h2>
        <h3>added blogs</h3>
        <ul>{blogsByUser.map(blog => <li key = {blog.id}>{blog.title}</li>)}</ul>
      </div>
    )
  }

  const Users = () => {
    const getUserId = (userName) => {
      if(blogs.length === 0) {
        return null
      }
      const blogByUser = blogs.find(blog => blog.user.name === userName)
      return blogByUser.user.id
    }
    return (
      <div className = 'container'> 
        {user !== null 
          && 
          <div>
              <Table striped>
                <tbody>
                  <tr>
                    <td><h4>users</h4></td>
                    <td><h4>blogs created</h4></td>
                  </tr>
                  <tr>
                    <td><Link to = {`/users/${getUserId('Yuvaraj')}`}>Yuvaraj</Link></td>
                    <td>{noOfBlogsByAuthor('Yuvaraj')}</td>
                  </tr>
                  <tr>
                    <td><Link to = {`/users/${getUserId('Vignesh')}`}>Vignesh</Link></td>
                    <td>{noOfBlogsByAuthor('Vignesh')}</td>
                  </tr>
                </tbody>
              </Table>
          </div>
        }
      </div>
    )
  }
  const padding = {
    padding: 5
  }
  return (
    <div className = 'container'>
      <Router>
        <div>
          { user !== null 
            && 
            <Navbar collapseOnSelect expand = 'lg' bg = 'dark' variant = 'dark'>
              <Navbar.Toggle aria-controls = 'responsive-navbar-nav'/>
              <Navbar.Collapse id = 'responsive-navbar-nav'>
                <Nav className = 'mr-auto'>
                  <Nav.Link href = '#' as = 'span'>
                    <Link style = {padding} to = '/blogs'>blogs</Link>
                  </Nav.Link>
                  <Nav.Link href = '#' as = 'span'>
                    <Link style = {padding} to = '/users'>users</Link>                  
                  </Nav.Link>
                  {user.name} logged in
                  <Button variant = 'secondary' type = 'submit' id = 'logout' onClick = {handleLogout}>Logout</Button>
                </Nav>
              </Navbar.Collapse>
            </Navbar> 
          }
        </div>
        <h2>Blogs App</h2>
        <Switch>
          <Route path = '/blogs/:id'>
            <Blog blogs = {blogs} increaseLike = {handleLike} handleDelete = {handleDelete} includeComment = {handleComment} />
          </Route>
          <Route path = '/users/:id'>
            <User />
          </Route>
          <Route path = '/users' render = {() =>
            user? <Users /> : <Redirect to ='/' />
          } />
          <Route path = '/blogs'>
            <Home />
          </Route>
          <Route path = '/'>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App