const initialState = {
  message: '',
  type: '',
  visible: false
}

let timeoutID = null

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SHOW':
      return { message: action.message.content, type: action.message.type, visible: true }
    case 'HIDE':
      return { message: '', type: '', visible: false }
    default:
      return state
  }
}

export const showNotification = (content, type, timeoutInSeconds) => {
  if (timeoutID !== null) {
    clearTimeout(timeoutID)
  }
  return async dispatch => {
    dispatch({
      type: 'SHOW',
      message: {
        content,
        type
      }
    })
    await new Promise(f => timeoutID = setTimeout(f, timeoutInSeconds * 1000))
    dispatch({
      type: 'HIDE'
    })
    timeoutID = null
  }
}

export default reducer
