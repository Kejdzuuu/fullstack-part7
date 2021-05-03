import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import { showNotification } from './reducers/notificationReducer'
import { createNewBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUser, logInUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'

const App = () => { 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(logInUser(username, password))
    .catch(error => {
      dispatch(showNotification('Wrong username or password', 'error', 3))
    })
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const addNewBlog = async (content) => {
    newBlogFormRef.current.toggleVisibility()

    dispatch(createNewBlog(content, user))
    .catch(error => {
      dispatch(showNotification('blog could not be added', 'error', 3))
    })
    dispatch(showNotification(`${content.title} by ${content.author} added`, 'info', 3))
  }

  const likeBlogHandler = async (blog) => {
    dispatch(likeBlog(blog))
    .catch(error => {
      dispatch(showNotification('couldn\'t like blog', 'error', 3))
    })
  }

  const deleteBlogHandler = async (id) => {
    dispatch(deleteBlog(id))
    .catch(error => {
      dispatch(showNotification('couldn\'t delete blog', 'error', 3))
    })
  }

  const newBlogFormRef = useRef()

  const newBlogForm = () => (
    <Togglable buttonLabel='add blog' ref={newBlogFormRef}>
      <NewBlogForm addNewBlog={addNewBlog} />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
        <Notification />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <p>
            {user.name ?
              `logged in as ${user.name}` :
              `logged in as ${user.username}`
            }
            <br />
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>

        <Switch>
          <Route path="/blogs/:id">
            <BlogDetails likeBlog={likeBlogHandler}/>
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            {newBlogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} user={user.username} likeBlog={likeBlogHandler} deleteBlog={deleteBlogHandler}/>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App