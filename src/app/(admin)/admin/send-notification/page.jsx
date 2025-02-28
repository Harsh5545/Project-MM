import SendNotification from '@/components/PushNotificationManager/SendNotification'
import React from 'react'

const page = () => {
  return (
    <div>
      <h1>Send Notification to all Users</h1>
      <SendNotification/>
    </div>
  )
}

export default page