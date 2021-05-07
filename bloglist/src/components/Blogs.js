import React, { useRef } from 'react'
import NewBlogForm from '../components/NewBlogForm'
import Togglable from '../components/Togglable'
import Blog from '../components/Blog'
import { createNewBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import { showNotification } from '../reducers/notificationReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  
  const addNewBlog = async (content) => {
    newBlogFormRef.current.toggleVisibility()

    dispatch(createNewBlog(content, user))
    .catch(error => {
      dispatch(showNotification('blog could not be added', 'danger', 3))
    })
    dispatch(showNotification(`${content.title} by ${content.author} added`, 'success', 3))
  }

  const newBlogFormRef = useRef()

  const newBlogForm = () => (
    <Togglable buttonLabel='add blog' ref={newBlogFormRef}>
      <NewBlogForm addNewBlog={addNewBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>blogs</h2>
      {newBlogForm()}
      <Table striped>
        <tbody>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs
