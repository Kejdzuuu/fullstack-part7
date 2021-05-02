import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { showNotification } from './reducers/notificationReducer'
import { createNewBlog, initializeBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => { 
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      dispatch(showNotification('Wrong username or password', 'error', 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const addNewBlog = async (content) => {
    newBlogFormRef.current.toggleVisibility()
    try {
      dispatch(createNewBlog(content, user))
      dispatch(showNotification(`${content.title} by ${content.author} added`, 'info', 3))
    } catch (exception) {
      console.log('Something went wrong')
      dispatch(showNotification('blog could not be added', 'error', 3))
    }
  }

  const likeBlogHandler = async (blog) => {
    try {
      dispatch(likeBlog(blog))
    } catch (exception) {
      dispatch(showNotification('couldn\'t like blog', 'error', 3))
    }
  }

  const deleteBlogHandler = async (id) => {
    try {
      dispatch(deleteBlog(id))
    } catch (exception) {
      dispatch(showNotification('couldn\'t delete blog', 'error', 3))
    }
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
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        <p>
          {user.name ?
            `logged in as ${user.name}` :
            `logged in as ${user.username}`
          }
          <button onClick={handleLogout}>logout</button>
        </p>
      </div>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.username} likeBlog={likeBlogHandler} deleteBlog={deleteBlogHandler}/>
      )}
    </div>
  )
}

export default App