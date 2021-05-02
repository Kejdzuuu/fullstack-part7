import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.visible) {
    return (
      <div className={notification.type}>
        {notification.message}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
