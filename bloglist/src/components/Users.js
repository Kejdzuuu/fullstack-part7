import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const users = []

  blogs.map(blog => {
    if(!blog.user.name) {
      blog.user.name = blog.user.username
    }
    return blog
  }).forEach(blog => {
    const index = users.findIndex(user => blog.user.id === user.id)
    if(index < 0) {
      users.push({...blog.user, blogs: [blog.id]})
    } else {
      users[index].blogs.push(blog.id)
    }
  })
  const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)

  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
