import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blogs).filter(blog => blog.user.id === id)
  const user = blogs.length ? blogs[0].user : null

  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name ? user.name : user.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User
