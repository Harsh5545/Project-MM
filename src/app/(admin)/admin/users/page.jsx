import UserTable from '@/components/Admin-Components/Users_components/UserTable'
import React from 'react'


export const metadata = {
  title: 'Manage Users',
}

const page = () => {
  return (
    <div>
      <UserTable/>
    </div>
  )
}

export default page