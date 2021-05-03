import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogDetails = ({ likeBlog }) => {
  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  if(!blog) {
    return null
  }

  const handleLikeButton = (event) => {
    event.preventDefault()

    likeBlog(blog)
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
    </div>
  )
}

export default BlogDetails
