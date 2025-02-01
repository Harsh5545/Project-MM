// import AddBlog from '@/components/Admin-Components/Blog-Admin-Component/AddBlog'
import { auth } from '@/auth'
import AddBlog from '@/components/Admin-Components/Blog-Admin-Component/AddBlog'
import React from 'react'

const addBlog = async () => {
  const session = await auth();
  console.log(session)
  return (
    <div><AddBlog userId={session?.user?.id} /></div>
  )
}

export default addBlog