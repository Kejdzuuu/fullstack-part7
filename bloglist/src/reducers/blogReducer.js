import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'INIT':
      return action.data
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

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}

export default reducer
