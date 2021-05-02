import notificationReducer from './reducers/notificationReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store
