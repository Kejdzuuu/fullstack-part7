import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import NavigationBar from './components/NavigationBar'
import './index.css'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
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

  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div className="container">
        <h2>Log in</h2>
        <LoginForm />
        <Notification />
      </div>
    )
  }

  return (
    <Router>
      <div>
        <NavigationBar />
        <Notification />

        <div className="container">
          <Switch>
            <Route path="/blogs/:id">
              <BlogDetails />
            </Route>
            <Route path="/users/:id">
              <User />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/">
              <Blogs />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App