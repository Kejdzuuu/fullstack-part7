import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Table } from 'react-bootstrap'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  const [comment, setComment] = useState('')

  if(!blog) {
    return null
  }

  const likeButtonHandler = (event) => {
    event.preventDefault()

    dispatch(likeBlog(blog))
    .catch(error => {
      dispatch(showNotification('couldn\'t like blog', 'danger', 3))
    })
  }

  const addCommentHandler = (event) => {
    event.preventDefault()

    dispatch(addComment(id, comment))
    setComment('')
  }

  const deleteBlogHandler = (event) => {
    dispatch(deleteBlog(id))
    .catch(error => {
      dispatch(showNotification('couldn\'t delete blog', 'danger', 3))
    })
    dispatch(showNotification('blog deleted', 'success', 3))
  }

  const horizontal_margin = {
    marginLeft: 5,
    marginRight: 5
  }

  const vertical_margin = {
    marginTop: 20
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a><br />
      </div>
      <div>
        {blog.likes} likes
        <Button variant="success" style={horizontal_margin} onClick={likeButtonHandler}>like</Button>
      </div>
      <div>
        added by {blog.user.name ? blog.user.name : blog.user.username}
      </div>
      <Button variant="danger" onClick={deleteBlogHandler}>delete blog</Button>
      <h2>{blog.comments.length} comments</h2>
      <form onSubmit={addCommentHandler}>
        <div>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        <Button variant="primary" style={horizontal_margin} type="submit">add comment</Button>
        </div>
      </form>
      <div className="container">
        <Table striped style={vertical_margin}>
          <tbody>
            {blog.comments.map((comment, index) =>
              <tr key={index}>
                <td>
                  {comment}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default BlogDetails
