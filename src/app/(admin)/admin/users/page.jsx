import UserTable from '@/components/Admin-Components/Users_components/UserTable'
import React from 'react'


export const metadata = {
  title: 'Users',
  description: 'Users page',
}

const page = () => {
  return (
    <div>
      <UserTable/>
    </div>
  )
}

export default page