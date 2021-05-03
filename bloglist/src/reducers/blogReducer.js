import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'DELETE':
      return state.filter(blog => blog.id !== action.id)
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const likedBlog = state.find(blog => blog.id === action.data.id)
      const newBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
      return state.map(blog =>
        blog.id === action.data.id ? newBlog : blog
      )
    default:
      return state
  }
}

export const createNewBlog = (content, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    newBlog.user = {
      username: user.username,
      name: user.name
    }
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = { ...blog, likes: blog.likes + 1 }
    await blogService.update(blog.id, newBlog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default reducer
