import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addComment } from '../reducers/blogReducer'

const BlogDetails = ({ likeBlog }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  const [comment, setComment] = useState('')

  if(!blog) {
    return null
  }

  const handleLikeButton = (event) => {
    event.preventDefault()

    likeBlog(blog)
  }

  const handleAddComment = (event) => {
    event.preventDefault()

    dispatch(addComment(id, comment))
    setComment('')
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a><br />
      </div>
      <div>
        {blog.likes} likes
        <button onClick={handleLikeButton}>like</button>
      </div>
      <div>
        added by {blog.user.name ? blog.user.name : blog.user.username}
      </div>
      <h2>{blog.comments.length} comments</h2>
      <form onSubmit={handleAddComment}>
        <div>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add comment</button>
      </form>
      <div>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails
