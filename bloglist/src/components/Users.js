import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {
  const blogs = useSelector(state => state.blogs)
  const users = blogs.map(blog => {
    if(!blog.user.name) {
      blog.user.name = blog.user.username
    }
    return blog.user
  }).reduce((acc, obj) => {
    acc[obj.name] = (acc[obj.name] || 0) + 1
    return acc
  }, {})
  const sortedUsers = Object.entries(users).sort(([a, ], [b, ]) => b - a)

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) =>
            <tr key={index}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
