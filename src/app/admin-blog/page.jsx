import AddBlog from '@/components/Admin-Components/Blog-Admin-Component/AddBlog'
import LoginGithub from '@/components/LoginMethod/LoginGithub'
import { SignInButton } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='h-screen flex justify-center items-center'> 
      <AddBlog />
    </div>
  )
}

export default page