import blogService from '../services/blogs'
import loginService from '../services/login'

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'LOG_IN':
    case 'INIT_USER':
      return action.user
    default:
      return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(loggedUserJSON)
  if (user) {
    blogService.setToken(user.token)
  }
  return {
    type: 'INIT_USER',
    user
  }
}

export const logInUser = (username, password) => {
  return async dispatch => {
    console.log('b4')
    const user = await loginService.login({ username, password })
    console.log('after')
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      user
    })
  }
}

export default reducer
