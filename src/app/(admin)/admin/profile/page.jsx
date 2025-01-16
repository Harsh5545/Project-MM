import { auth } from '@/auth';
import ProfilePage from '@/components/Profile/UserProfile'
import React from 'react'

const page = async () => {
  const session = await auth();
  return (
    <div>
        <ProfilePage data={session}/>
    </div>
  )
}

export default page