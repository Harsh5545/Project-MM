import UserForm from '@/components/SignUp/UserForm'
import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div>
     <UserForm/>
    </div>
  )
}

export default page