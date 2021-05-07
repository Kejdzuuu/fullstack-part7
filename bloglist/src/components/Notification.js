import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.visible) {
    return (
      <div>
        <Alert variant={notification.type} >
        {notification.message}
        </Alert>
      </div>
    )
  } else {
    return null
  }
}

export default Notification
